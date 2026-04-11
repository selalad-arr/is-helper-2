import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { SparklesIcon, CheckIcon, RocketLaunchIcon, BookOpenIcon, BoltIcon, ShieldCheckIcon } from '../ui/icons';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PricingPage: React.FC = () => {
    const { userData } = useAuth();
    const isPremium = userData?.isPremium;

    React.useEffect(() => {
        if (typeof OmiseCard !== 'undefined') {
            OmiseCard.configure({
                publicKey: import.meta.env.VITE_OMISE_PUBLIC_KEY,
                buttonLabel: 'Pay Now',
                submitLabel: 'Pay 79 ฿',
                currency: 'thb',
                frameLabel: 'IS Helper Premium',
                amount: 7900, // 79.00 THB in satangs
                onCreateTokenSuccess: async (token: string) => {
                    console.log('Payment Token:', token);
                    if (!userData?.uid) return;
                    
                    try {
                        const userRef = doc(db, 'users', userData.uid);
                        await setDoc(userRef, { 
                            isPremium: true,
                            subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                            lastPaymentToken: token,
                            paymentMethod: 'omise_card'
                        }, { merge: true });
                        alert("ยินดีด้วย! คุณได้รับการอัปเกรดเป็น Premium เรียบร้อยแล้ว ระบบได้รับยอดชำระเงินเรียบร้อย");
                    } catch (e) {
                        console.error(e);
                        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูลการชำระเงิน");
                    }
                }
            });
        }
    }, [userData?.uid]);

    const handlePayment = (e: React.MouseEvent) => {
        e.preventDefault();
        if (typeof OmiseCard !== 'undefined') {
            OmiseCard.open({
                amount: 7900,
                onCreateTokenSuccess: (token: string) => {
                    // This is also handled in the configuration but OmiseCard.open allows overriding
                }
            });
        } else {
            alert("ระบบชำระเงินยังไม่พร้อมใช้งาน กรุณาลองใหม่อีกครั้ง");
        }
    };

    const benefits = [
        {
            title: "Gemini 3 Flash (Advanced AI)",
            description: "เข้าถึงโมเดล AI รุ่นล่าสุดที่ฉลาดกว่า และเขียนสำนวนได้เป็นธรรมชาติมากกว่า",
            icon: <SparklesIcon className="w-6 h-6 text-sky-500" />
        },
        {
            title: "Unlimited Projects",
            description: "สร้างโครงงานได้ไม่จำกัด (ระบบฟรีจำกัดเพียง 3 โครงงานเท่านั้น)",
            icon: <RocketLaunchIcon className="w-6 h-6 text-indigo-500" />
        },
        {
            title: "Advanced Data Analysis",
            description: "ช่วยวิเคราะห์ผลการทดลองและสร้างสรุปบทที่ 4-5 แบบเจาะลึก",
            icon: <BoltIcon className="w-6 h-6 text-amber-500" />
        },
        {
            title: "Professional PDF/Word Export",
            description: "ดาวน์โหลดเล่มโครงงานแบบสมบูรณ์ ไม่ติดลายน้ำ พร้อม Template มาตรฐาน",
            icon: <BookOpenIcon className="w-6 h-6 text-emerald-500" />
        },
        {
            title: "Smart Citation Generator",
            description: "สร้างบรรณานุกรมอัตโนมัติจาก Link หรือชื่อหนังสือ ถูกต้องตามหลักวิชาการ",
            icon: <ShieldCheckIcon className="w-6 h-6 text-purple-500" />
        }
    ];

    return (
        <div className="py-12 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-bold mb-6"
                >
                    <SparklesIcon className="w-4 h-4" />
                    Premium Individual Plan
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 leading-tight"
                >
                    ยกระดับการทำโครงงาน IS <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">ให้เป็นเรื่องง่ายและสมบูรณ์แบบ</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                >
                    ปลดล็อคขีดจำกัดของ AI และเครื่องมือจัดการโครงงานทั้งหมด เพื่อให้คุณทำรูปเล่มวิจัยได้เหมือนมืออาชีพ ในราคาที่คุ้มค่าที่สุด
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Benefits List */}
                <div className="space-y-8">
                    {benefits.map((benefit, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx + 0.3 }}
                            className="flex gap-4"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{benefit.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                        {isPremium && (
                            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-6 py-2 rounded-bl-3xl text-sm font-bold shadow-lg">
                                Active Subscription
                            </div>
                        )}
                        
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Individual Monthly</h2>
                            <p className="text-slate-500 dark:text-slate-500">จ่ายรายเดือน ยกเลิกได้ตลอดเวลา</p>
                        </div>

                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-6xl font-black text-slate-800 dark:text-white">79</span>
                            <span className="text-2xl text-slate-500 dark:text-slate-400 font-bold">฿/เดือน</span>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <CheckIcon className="w-5 h-5 text-emerald-500" />
                                <span>Free Gemini 3 Flash access</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <CheckIcon className="w-5 h-5 text-emerald-500" />
                                <span>No daily limits on AI calls</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <CheckIcon className="w-5 h-5 text-emerald-500" />
                                <span>Priority Cloud Backup</span>
                            </div>
                        </div>

                        <button 
                            disabled={isPremium}
                            onClick={handlePayment}
                            className={`w-full py-5 px-8 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-2 shadow-xl ${
                                isPremium 
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                                    : 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                        >
                            {isPremium ? 'คุณเป็นพรีเมี่ยมแล้ว' : 'สมัครสมาชิกพรีเมี่ยมเลย (79฿)'}
                        </button>
                        
                        <p className="text-center mt-6 text-slate-400 text-sm">
                            จ่ายเงินผ่าน PromptPay ทิพเนตร ปลอดภัย 100%
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Comparison */}
            <div className="mt-24">
                <h2 className="text-3xl font-black text-center text-slate-800 dark:text-white mb-12">เปรียบเทียบแผนการใช้งาน</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="py-6 px-4 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Features</th>
                                <th className="py-6 px-4 text-slate-800 dark:text-white font-black text-lg">แบบฟรี (Free)</th>
                                <th className="py-6 px-4 text-slate-800 dark:text-white font-black text-lg">ใช้ API Key ตัวเอง</th>
                                <th className="py-6 px-4 text-sky-600 dark:text-sky-400 font-black text-lg">พรีเมี่ยม (79฿)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300 font-medium">AI Model</td>
                                <td className="py-6 px-4 text-slate-500 dark:text-slate-500">Gemini 1.5 Flash</td>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300">เลือกได้อิสระ</td>
                                <td className="py-6 px-4 font-bold text-slate-800 dark:text-white">Gemini 3 Flash (Advanced)</td>
                            </tr>
                            <tr>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300 font-medium">Daily AI Limits</td>
                                <td className="py-6 px-4 text-slate-500 dark:text-slate-500">3 ครั้งต่อวัน</td>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300">ตามโควต้า Key คุณ</td>
                                <td className="py-6 px-4 font-bold text-slate-800 dark:text-white">ไม่จำกัด (รวมในค่าสมาชิก)</td>
                            </tr>
                            <tr>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300 font-medium">Project Quota</td>
                                <td className="py-6 px-4 text-slate-500 dark:text-slate-500">สูงสุด 3 โครงงาน</td>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300">ไม่จำกัด</td>
                                <td className="py-6 px-4 font-bold text-slate-800 dark:text-white">ไม่จำกัด</td>
                            </tr>
                            <tr>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300 font-medium">Export Report</td>
                                <td className="py-6 px-4 text-slate-500 dark:text-slate-500">มีลายน้ำระบบฟรี</td>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300">ไม่มีลายน้ำ</td>
                                <td className="py-6 px-4 font-bold text-slate-800 dark:text-white">ไม่มีลายน้ำ (Pro Template)</td>
                            </tr>
                            <tr>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300 font-medium">Cost / ค่าใช้จ่าย</td>
                                <td className="py-6 px-4 text-emerald-600 font-bold">ฟรีตลอดชีพ</td>
                                <td className="py-6 px-4 text-slate-700 dark:text-slate-300">ค่า API จ่ายตรง Google</td>
                                <td className="py-6 px-4 font-bold text-sky-600">79 บาท / เดือน</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
