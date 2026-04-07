
import React from 'react';

interface ActivityTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

export const ActivityTextInput: React.FC<ActivityTextInputProps> = ({ placeholder = "...", ...props }) => (
    <input 
        type="text" 
        className="w-full p-2 h-full border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:ring-sky-500 focus:border-sky-500"
        placeholder={placeholder}
        {...props}
    />
);