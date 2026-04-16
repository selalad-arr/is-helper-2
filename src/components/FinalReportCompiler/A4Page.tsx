import React from 'react';

export const A4Page: React.FC<React.PropsWithChildren<{ pageNumber?: number, totalPages?: number }>> = ({ children, pageNumber, totalPages }) => (
    <div className="relative bg-white text-black shadow-2xl mb-8 mx-auto print:shadow-none print:m-0" style={{ width: '210mm', minHeight: '297mm', padding: '1.5in 1in 1in 1.5in' }}>
        <div className="absolute top-4 left-4 text-[9px] text-slate-300 uppercase tracking-widest pointer-events-none print:hidden">A4 Preview Content</div>
        {pageNumber && totalPages && (
            <div className="absolute bottom-4 right-8 text-[12pt] text-slate-400 font-serif">{pageNumber} / {totalPages}</div>
        )}
        <div className="h-full" style={{ fontFamily: 'THSarabunPSK, sans-serif' }}>
            {children}
        </div>
    </div>
);
