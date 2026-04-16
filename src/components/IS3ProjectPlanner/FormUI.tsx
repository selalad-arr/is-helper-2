import React from 'react';
import { motion } from 'motion/react';

export const FormRow = ({ label, children, htmlFor }: React.PropsWithChildren<{ label: string, htmlFor: string }>) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
    >
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
        {children}
    </motion.div>
);

export const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        type="text"
        className="w-full p-3.5 border border-slate-200 dark:border-slate-700/60 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 shadow-sm"
        {...props}
    />
);

export const FormTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea 
        className="w-full p-3.5 border border-slate-200 dark:border-slate-700/60 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 shadow-sm resize-y min-h-[120px]"
        {...props}
    />
);
