import React from 'react';
import { Sparkles } from 'lucide-react';
import { A4Page } from './A4Page';

interface AbstractPageProps {
    projectAbstract: string;
    setProjectAbstract: (v: string) => void;
    acknowledgements: string;
    setAcknowledgements: (v: string) => void;
    onAiPolish: (key: string, text: string, type: 'meta', field: string) => void;
    onSaveMetadata: (field: string, value: string) => void;
    totalPages: number;
}

const AbstractPage: React.FC<AbstractPageProps> = ({
    projectAbstract, setProjectAbstract,
    acknowledgements, setAcknowledgements,
    onAiPolish, onSaveMetadata,
    totalPages
}) => {
    return (
        <A4Page pageNumber={2} totalPages={totalPages}>
            <div className="space-y-16">
                <section>
                    <h2 className="text-[22pt] font-bold text-center mb-8">บทคัดย่อ</h2>
                    <div className="group relative">
                        <button onClick={() => onAiPolish('abstract', projectAbstract, 'meta', 'projectAbstract')} className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-all">
                            <Sparkles className="w-5 h-5" />
                        </button>
                        <textarea 
                            value={projectAbstract} 
                            onChange={(e) => {setProjectAbstract(e.target.value); onSaveMetadata('projectAbstract', e.target.value);}}
                            className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-100 p-2 rounded text-[16pt] leading-[1.8] text-justify resize-none h-auto min-h-[200px]"
                            style={{ textIndent: '1.5cm' }}
                            onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                            placeholder="พิมพ์บทคัดย่อ..."
                        />
                    </div>
                </section>
                <section>
                    <h2 className="text-[22pt] font-bold text-center mb-8">กิตติกรรมประกาศ</h2>
                    <div className="group relative">
                        <button onClick={() => onAiPolish('ack', acknowledgements, 'meta', 'acknowledgements')} className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-all">
                            <Sparkles className="w-5 h-5" />
                        </button>
                        <textarea 
                            value={acknowledgements} 
                            onChange={(e) => {setAcknowledgements(e.target.value); onSaveMetadata('acknowledgements', e.target.value);}}
                            className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-100 p-2 rounded text-[16pt] leading-[1.8] text-justify resize-none h-auto min-h-[200px]"
                            style={{ textIndent: '1.5cm' }}
                            onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                            placeholder="พิมพ์กิตติกรรมประกาศ..."
                        />
                    </div>
                </section>
            </div>
        </A4Page>
    );
};

export default AbstractPage;
