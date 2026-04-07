import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  deleteDoc,
  updateDoc,
  getDocs,
  limit
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { QUIZ_QUESTIONS, QuizQuestion } from '../constants/quizQuestions';
import { Trophy, Users, Play, LogOut, Timer, CheckCircle, CircleX as XCircle, Crown, Award } from 'lucide-react';

interface QuizRoom {
  id: string;
  hostId: string;
  hostName: string;
  status: 'waiting' | 'active' | 'finished';
  currentQuestionIndex: number;
  questionIds: string[];
  createdAt: any;
  startedAt?: any;
}

interface QuizPlayer {
  uid: string;
  displayName: string;
  score: number;
  lastAnswer?: string;
  lastAnswerCorrect?: boolean;
  joinedAt: any;
}

export const QuizSystem: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<QuizRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<QuizRoom | null>(null);
  const [players, setPlayers] = useState<QuizPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [hasAnswered, setHasAnswered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Listen for active rooms
  useEffect(() => {
    if (!user || user.uid === 'admin-mock-id') {
      setRooms([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'quiz_rooms'),
      where('status', '!=', 'finished'),
      orderBy('status'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QuizRoom));
      setRooms(roomData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching rooms:", err);
      // Only set error if it's not a permission error for mock users
      if (user?.uid !== 'admin-mock-id') {
        setError("ไม่สามารถโหลดห้องแข่งขันได้ (Permission Denied)");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Listen for current room and players
  useEffect(() => {
    if (!currentRoom || !user) {
      setPlayers([]);
      return;
    }

    const roomUnsubscribe = onSnapshot(doc(db, 'quiz_rooms', currentRoom.id), (docSnap) => {
      if (docSnap.exists()) {
        setCurrentRoom({ id: docSnap.id, ...docSnap.data() } as QuizRoom);
      } else {
        setCurrentRoom(null);
      }
    }, (err) => {
      console.error("Error fetching room details:", err);
    });

    const playersUnsubscribe = onSnapshot(
      query(collection(db, 'quiz_rooms', currentRoom.id, 'players'), orderBy('score', 'desc')),
      (snapshot) => {
        const playerData = snapshot.docs.map(doc => doc.data() as QuizPlayer);
        setPlayers(playerData);
      },
      (err) => {
        console.error("Error fetching players:", err);
      }
    );

    return () => {
      roomUnsubscribe();
      playersUnsubscribe();
    };
  }, [currentRoom?.id, user]);

  // Timer logic
  useEffect(() => {
    if (currentRoom?.status === 'active') {
      setTimeLeft(15);
      setHasAnswered(false);
      
      if (timerRef.current) clearInterval(timerRef.current);
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            // If host, move to next question after some delay
            if (user?.uid === currentRoom.hostId) {
              setTimeout(() => handleNextQuestion(), 3000);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentRoom?.status, currentRoom?.currentQuestionIndex]);

  const createRoom = async () => {
    if (!user) return;
    try {
      const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newRoom: Omit<QuizRoom, 'id'> = {
        hostId: user.uid,
        hostName: user.displayName || 'ผู้ใช้',
        status: 'waiting',
        currentQuestionIndex: 0,
        questionIds: QUIZ_QUESTIONS.map(q => q.id),
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, 'quiz_rooms', roomId), newRoom);
      await joinRoom(roomId);
    } catch (err) {
      console.error("Error creating room:", err);
      setError("สร้างห้องไม่สำเร็จ");
    }
  };

  const joinRoom = async (roomId: string) => {
    if (!user) return;
    try {
      const player: QuizPlayer = {
        uid: user.uid,
        displayName: user.displayName || 'ผู้ใช้',
        score: 0,
        joinedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'quiz_rooms', roomId, 'players', user.uid), player);
      setCurrentRoom({ id: roomId } as QuizRoom); // Temporary until snapshot takes over
    } catch (err) {
      console.error("Error joining room:", err);
      setError("เข้าร่วมห้องไม่สำเร็จ");
    }
  };

  const leaveRoom = async () => {
    if (!user || !currentRoom) return;
    try {
      await deleteDoc(doc(db, 'quiz_rooms', currentRoom.id, 'players', user.uid));
      
      // If host leaves, delete the room
      if (user.uid === currentRoom.hostId) {
        await updateDoc(doc(db, 'quiz_rooms', currentRoom.id), { status: 'finished' });
      }
      
      setCurrentRoom(null);
    } catch (err) {
      console.error("Error leaving room:", err);
    }
  };

  const startGame = async () => {
    if (!currentRoom || user?.uid !== currentRoom.hostId) return;
    try {
      await updateDoc(doc(db, 'quiz_rooms', currentRoom.id), {
        status: 'active',
        currentQuestionIndex: 0,
        startedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error starting game:", err);
    }
  };

  const handleNextQuestion = async () => {
    if (!currentRoom || user?.uid !== currentRoom.hostId) return;
    
    const nextIndex = currentRoom.currentQuestionIndex + 1;
    if (nextIndex >= QUIZ_QUESTIONS.length) {
      await updateDoc(doc(db, 'quiz_rooms', currentRoom.id), { status: 'finished' });
    } else {
      await updateDoc(doc(db, 'quiz_rooms', currentRoom.id), { currentQuestionIndex: nextIndex });
    }
  };

  const submitAnswer = async (answerIndex: number) => {
    if (!user || !currentRoom || hasAnswered || timeLeft === 0) return;
    
    setHasAnswered(true);
    const question = QUIZ_QUESTIONS[currentRoom.currentQuestionIndex];
    const isCorrect = answerIndex === question.correctAnswer;
    const points = isCorrect ? Math.round(question.points * (timeLeft / 15 + 0.5)) : 0;

    try {
      const currentPlayer = players.find(p => p.uid === user.uid);
      if (currentPlayer) {
        await updateDoc(doc(db, 'quiz_rooms', currentRoom.id, 'players', user.uid), {
          score: currentPlayer.score + points,
          lastAnswerCorrect: isCorrect
        });
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-2 border-slate-100 dark:border-slate-700">
        <Trophy className="w-16 h-16 mx-auto text-amber-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบเพื่อเล่นเกม</h2>
        <p className="text-slate-500 dark:text-slate-400">แข่งขันตอบคำถาม IS กับเพื่อนๆ เพื่อชิงความเป็นหนึ่ง!</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // --- Render Lobby ---
  if (!currentRoom) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quiz Competition 🏆
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            ท้าทายความรู้เรื่อง IS กับเพื่อนๆ ในห้องเรียนแบบเรียลไทม์
          </p>
          <button 
            onClick={createRoom}
            className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all"
          >
            สร้างห้องใหม่ +
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {rooms.length === 0 ? (
              <div className="col-span-full text-center p-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl">
                <Users className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400">ยังไม่มีห้องที่กำลังรอผู้เล่น... สร้างห้องคนแรกเลย!</p>
              </div>
            ) : (
              rooms.map(room => (
                <motion.div 
                  key={room.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-2 border-slate-100 dark:border-slate-700 hover:border-sky-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">ห้องของ {room.hostName}</h3>
                      <p className="text-sm text-slate-500">รหัสห้อง: {room.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      room.status === 'waiting' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {room.status === 'waiting' ? 'กำลังรอ...' : 'กำลังแข่ง'}
                    </span>
                  </div>
                  <button 
                    onClick={() => joinRoom(room.id)}
                    disabled={room.status !== 'waiting'}
                    className="w-full py-3 bg-slate-100 dark:bg-slate-700 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all disabled:opacity-50"
                  >
                    เข้าร่วม
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- Render Waiting Room ---
  if (currentRoom.status === 'waiting') {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-8 bg-sky-500 text-white text-center relative">
          <button onClick={leaveRoom} className="absolute left-6 top-8 p-2 hover:bg-white/20 rounded-full transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-black mb-2">รหัสห้อง: {currentRoom.id}</h2>
          <p className="opacity-90 font-medium">กำลังรอผู้เล่นคนอื่นๆ ({players.length})</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {players.map(player => (
              <div key={player.uid} className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center text-sky-600 mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-center line-clamp-1">{player.displayName}</span>
                {player.uid === currentRoom.hostId && <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest">Host</span>}
              </div>
            ))}
          </div>

          {user.uid === currentRoom.hostId ? (
            <button 
              onClick={startGame}
              disabled={players.length < 1}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6 fill-current" />
              เริ่มเกมเลย!
            </button>
          ) : (
            <div className="text-center py-4 text-slate-500 font-medium animate-pulse">
              รอโฮสต์เริ่มเกม...
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Render Game ---
  if (currentRoom.status === 'active') {
    const question = QUIZ_QUESTIONS[currentRoom.currentQuestionIndex];
    
    return (
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Game Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border-2 border-slate-100 dark:border-slate-700 p-8 md:p-12 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 dark:bg-slate-700">
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / 15) * 100}%` }}
                className={`h-full ${timeLeft < 5 ? 'bg-rose-500' : 'bg-sky-500'}`}
              />
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-bold">
                ข้อที่ {currentRoom.currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <div className={`flex items-center gap-2 text-2xl font-black ${timeLeft < 5 ? 'text-rose-500 animate-pulse' : 'text-slate-700 dark:text-slate-200'}`}>
                <Timer className="w-6 h-6" />
                {timeLeft}s
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-slate-800 dark:text-white leading-tight">
              {question.text}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, idx) => {
                const isSelected = hasAnswered; // Simplified for now
                const isCorrect = timeLeft === 0 && idx === question.correctAnswer;
                
                return (
                  <button
                    key={idx}
                    onClick={() => submitAnswer(idx)}
                    disabled={hasAnswered || timeLeft === 0}
                    className={`p-6 text-left rounded-2xl border-2 font-bold transition-all transform active:scale-95 ${
                      timeLeft === 0 
                        ? (idx === question.correctAnswer ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 opacity-50')
                        : (hasAnswered 
                            ? 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 opacity-70'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20')
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real-time Leaderboard */}
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border-2 border-slate-100 dark:border-slate-700 p-6">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            อันดับปัจจุบัน
          </h3>
          <div className="space-y-3">
            {players.map((player, idx) => (
              <div key={player.uid} className={`flex items-center justify-between p-4 rounded-2xl border ${
                player.uid === user.uid ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800' : 'bg-slate-50 dark:bg-slate-700/50 border-slate-100 dark:border-slate-600'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-black text-slate-400">{idx + 1}</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm line-clamp-1">{player.displayName}</span>
                    {timeLeft === 0 && (
                      <span className={`text-[10px] font-bold uppercase ${player.lastAnswerCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {player.lastAnswerCorrect ? 'ถูกต้อง! ✅' : 'ผิด ❌'}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-black text-sky-600 dark:text-sky-400">{player.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Render Results ---
  if (currentRoom.status === 'finished') {
    const winner = players[0];
    const isWinner = user.uid === winner?.uid;

    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl border-2 border-slate-100 dark:border-slate-700 p-12 relative overflow-hidden"
        >
          {/* Confetti effect placeholder */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: Math.random() * 400 - 200, rotate: 0 }}
                animate={{ y: 600, rotate: 360 }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute top-0 left-1/2 w-3 h-3 bg-sky-500 rounded-full opacity-20"
              />
            ))}
          </div>

          <div className="relative z-10">
            {isWinner ? (
              <Crown className="w-24 h-24 mx-auto text-amber-500 mb-6 drop-shadow-lg" />
            ) : (
              <Award className="w-24 h-24 mx-auto text-sky-500 mb-6 drop-shadow-lg" />
            )}
            
            <h2 className="text-4xl font-black mb-2">
              {isWinner ? 'ยินดีด้วย! คุณชนะเลิศ 🏆' : 'จบการแข่งขันแล้ว! 🏁'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10">ขอบคุณทุกคนที่ร่วมสนุกและเรียนรู้ไปด้วยกัน</p>

            <div className="space-y-4 mb-10">
              {players.slice(0, 3).map((player, idx) => (
                <div key={player.uid} className={`flex items-center justify-between p-6 rounded-3xl border-2 ${
                  idx === 0 ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' : 'bg-slate-50 dark:bg-slate-700/50 border-slate-100 dark:border-slate-600'
                }`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-black ${idx === 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                      #{idx + 1}
                    </span>
                    <span className="text-xl font-bold">{player.displayName}</span>
                  </div>
                  <span className="text-2xl font-black text-sky-600 dark:text-sky-400">{player.score}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={leaveRoom}
              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xl rounded-2xl shadow-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};
