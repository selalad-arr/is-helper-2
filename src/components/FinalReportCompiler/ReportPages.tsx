import React from 'react';
import { Sparkles } from 'lucide-react';
import { A4Page } from './A4Page';

interface ChapterPageProps {
    chapter: any;
    pageIdx: number;
    totalPages: number;
    localInputs: any;
    onLocalInputChange: (key: string, val: string) => void;
    onAiPolish: (key: string, text: string) => void;
}

export const ChapterPage: React.FC<ChapterPageProps> = ({
    chapter, pageIdx, totalPages, localInputs, onLocalInputChange, onAiPolish
}) => {
    return (
        <A4Page pageNumber={3 + pageIdx} totalPages={totalPages}>
            <h2 className="text-[22pt] font-bold text-center mb-12">บทที่ {chapter.chapter_number}<br/>{chapter.title}</h2>
            {chapter.sections?.map((section: any, sIdx: number) => {
                const key = `${chapter.chapter_number}_${sIdx}`;
                const val = localInputs[key] || '';
                return (
                    <div key={key} className="mb-10 group relative">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[17pt] font-bold">{chapter.chapter_number}.{sIdx+1} {section.header}</h3>
                            <button onClick={() => onAiPolish(key, val)} className="opacity-0 group-hover:opacity-100 text-indigo-500 p-1 hover:bg-indigo-50 rounded-md transition-all">
                                <Sparkles className="w-4 h-4" />
                            </button>
                        </div>
                        <textarea 
                            value={val}
                            onChange={(e) => onLocalInputChange(key, e.target.value)}
                            className="w-full border-none focus:ring-1 focus:ring-indigo-50 p-2 rounded text-[16pt] leading-[1.8] text-justify bg-transparent resize-none overflow-hidden min-h-[100px]"
                            style={{ textIndent: '1.5cm' }}
                            onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                            placeholder="..."
                        />
                    </div>
                );
            })}
        </A4Page>
    );
};

interface ReferencesPageProps {
    references: string;
    setReferences: (v: string) => void;
    onAiPolish: (key: string, text: string, type: 'meta', field: string) => void;
    onSaveMetadata: (field: string, value: string) => void;
    totalPages: number;
}

export const ReferencesPage: React.FC<ReferencesPageProps> = ({
    references, setReferences, onAiPolish, onSaveMetadata, totalPages
}) => {
    return (
        <A4Page pageNumber={totalPages} totalPages={totalPages}>
            <h2 className="text-[22pt] font-bold text-center mb-10">เอกสารอ้างอิง</h2>
            <div className="group relative">
                 <button onClick={() => onAiPolish('ref', references, 'meta', 'references')} className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 text-indigo-500 p-2 hover:bg-indigo-50 rounded-full transition-all">
                    <Sparkles className="w-5 h-5" />
                </button>
                <textarea 
                    value={references} 
                    onChange={(e) => {setReferences(e.target.value); onSaveMetadata('references', e.target.value);}}
                    className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-100 p-2 rounded text-[16pt] leading-[1.8] resize-none h-auto min-h-[400px]"
                    onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                    placeholder="รายการเอกสารอ้างอิง..."
                />
            </div>
        </A4Page>
    );
};
