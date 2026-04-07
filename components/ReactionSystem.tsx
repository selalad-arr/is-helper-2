import React, { useState, useEffect } from 'react';
import { ThumbsUp, Heart, Smile } from 'lucide-react';
import { db, auth } from '../src/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

interface Reaction {
  uid: string;
  type: string;
  timestamp: Timestamp;
}

interface ReactionSystemProps {
  topicId: string;
}

const REACTION_TYPES = [
  { id: 'like', icon: ThumbsUp, label: 'Like', color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'love', icon: Heart, label: 'Love', color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'smile', icon: Smile, label: 'Happy', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'sticker1', label: '🚀', isEmoji: true },
  { id: 'sticker2', label: '🎉', isEmoji: true },
  { id: 'sticker3', label: '⭐', isEmoji: true },
];

export const ReactionSystem: React.FC<ReactionSystemProps> = ({ topicId }) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showStickers, setShowStickers] = useState(false);

  useEffect(() => {
    if (!topicId || !auth.currentUser) return;

    const reactionsRef = collection(db, 'topic_reactions', topicId, 'reactions');
    const q = query(reactionsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedReactions: Reaction[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Reaction;
        loadedReactions.push(data);
        if (data.uid === auth.currentUser?.uid) {
          setUserReaction(data.type);
        }
      });
      setReactions(loadedReactions);
      
      // If user reaction is not in the snapshot, reset it
      if (!snapshot.docs.some(doc => doc.data().uid === auth.currentUser?.uid)) {
        setUserReaction(null);
      }
    }, (error) => {
      console.error("Error fetching reactions:", error);
    });

    return () => unsubscribe();
  }, [topicId]);

  const handleReaction = async (type: string) => {
    if (!auth.currentUser) return;

    const reactionDocRef = doc(db, 'topic_reactions', topicId, 'reactions', auth.currentUser.uid);

    try {
      if (userReaction === type) {
        // Remove reaction
        await deleteDoc(reactionDocRef);
        setUserReaction(null);
      } else {
        // Add or update reaction
        await setDoc(reactionDocRef, {
          uid: auth.currentUser.uid,
          type: type,
          timestamp: serverTimestamp()
        });
        setUserReaction(type);
      }
    } catch (error) {
      console.error("Error saving reaction:", error);
    }
  };

  const getCount = (type: string) => {
    return reactions.filter(r => r.type === type).length;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4">
      {REACTION_TYPES.slice(0, 3).map((reaction) => {
        const Icon = reaction.icon!;
        const isActive = userReaction === reaction.id;
        const count = getCount(reaction.id);

        return (
          <button
            key={reaction.id}
            onClick={() => handleReaction(reaction.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
              isActive 
                ? `${reaction.bg} ${reaction.color} ring-1 ring-current shadow-sm` 
                : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Icon size={18} className={isActive ? 'fill-current' : ''} />
            {count > 0 && <span className="text-xs font-bold">{count}</span>}
          </button>
        );
      })}

      <div className="relative">
        <button
          onClick={() => setShowStickers(!showStickers)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
            userReaction?.startsWith('sticker')
              ? 'bg-purple-50 text-purple-600 ring-1 ring-current shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <span className="text-lg leading-none">
            {userReaction?.startsWith('sticker') 
              ? REACTION_TYPES.find(r => r.id === userReaction)?.label 
              : '✨'}
          </span>
          {reactions.filter(r => r.type.startsWith('sticker')).length > 0 && (
            <span className="text-xs font-bold">
              {reactions.filter(r => r.type.startsWith('sticker')).length}
            </span>
          )}
        </button>

        <AnimatePresence>
          {showStickers && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowStickers(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full mb-2 left-0 z-20 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex gap-2"
              >
                {REACTION_TYPES.slice(3).map((sticker) => (
                  <button
                    key={sticker.id}
                    onClick={() => {
                      handleReaction(sticker.id);
                      setShowStickers(false);
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                      userReaction === sticker.id ? 'bg-slate-100 dark:bg-slate-700' : ''
                    }`}
                  >
                    {sticker.label}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
