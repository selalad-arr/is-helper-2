import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generatePresentationContent } from '../../services/gemini';
import type { PresentationContent } from '../../services/gemini';
import { ExclamationTriangleIcon } from '../../ui/icons';
import { trackEvent } from '../../services/analyticsService';
import { useFirestoreData } from '../../hooks/useFirestore';

// Sub-components
import PresentationForm from './PresentationForm';
import PresentationOutput, { SkeletonLoader } from './PresentationOutput';

const PresentationGenerator = () => {
    const { data: presentationData, updateData: updatePresentationData, loading: isDataLoading } = useFirestoreData('user_presentations', 'main', {
        projectTitle: '',
        introduction: '',
        methodology: '',
        results: '',
        conclusion: '',
        textContent: null as string | null
    });

    const [projectTitle, setProjectTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [methodology, setMethodology] = useState('');
    const [results, setResults] = useState('');
    const [conclusion, setConclusion] = useState('');
    const [textContent, setTextContent] = useState<PresentationContent | null>(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isDataLoading) {
            setProjectTitle(presentationData.projectTitle);
            setIntroduction(presentationData.introduction);
            setMethodology(presentationData.methodology);
            setResults(presentationData.results);
            setConclusion(presentationData.conclusion);
            if (presentationData.textContent) {
                try {
                    setTextContent(JSON.parse(presentationData.textContent));
                } catch (e) {
                    console.error("Failed to parse textContent", e);
                }
            } else {
                setTextContent(null);
            }
        }
    }, [presentationData, isDataLoading]);

    const handleSetProjectTitle = (val: string) => { setProjectTitle(val); updatePresentationData({ projectTitle: val }); };
    const handleSetIntroduction = (val: string) => { setIntroduction(val); updatePresentationData({ introduction: val }); };
    const handleSetMethodology = (val: string) => { setMethodology(val); updatePresentationData({ methodology: val }); };
    const handleSetResults = (val: string) => { setResults(val); updatePresentationData({ results: val }); };
    const handleSetConclusion = (val: string) => { setConclusion(val); updatePresentationData({ conclusion: val }); };
    const handleSetTextContent = (val: PresentationContent | null) => { setTextContent(val); updatePresentationData({ textContent: val ? JSON.stringify(val) : null }); };

    const handleSubmit = async () => {
        if (!projectTitle.trim() || !introduction.trim() || !methodology.trim() || !results.trim() || !conclusion.trim()) return;

        setIsLoading(true);
        setError(null);
        handleSetTextContent(null);

        trackEvent('generate_presentation_content', {
            project_title: projectTitle,
        });

        try {
            const contentResult = await generatePresentationContent(projectTitle, introduction, methodology, results, conclusion);
            handleSetTextContent(contentResult);
        } catch (e: any) {
            setError(e.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
        } finally {
            setIsLoading(false);
        }
    };

    const isSubmitDisabled = isLoading || !projectTitle.trim() || !introduction.trim() || !methodology.trim() || !results.trim() || !conclusion.trim();

    if (isDataLoading) {
        return (
            <div className="mt-6 p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm">
                <div className="space-y-4">
                    <SkeletonLoader className="h-12 w-full" />
                    <SkeletonLoader className="h-24 w-full" />
                    <SkeletonLoader className="h-24 w-full" />
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            <PresentationForm 
                projectTitle={projectTitle} setProjectTitle={handleSetProjectTitle}
                introduction={introduction} setIntroduction={handleSetIntroduction}
                methodology={methodology} setMethodology={handleSetMethodology}
                results={results} setResults={handleSetResults}
                conclusion={conclusion} setConclusion={handleSetConclusion}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                isSubmitDisabled={isSubmitDisabled}
            />

            <AnimatePresence>
                {error && (
                        <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                        >
                            <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
                                </div>
                                <div className="text-red-800 dark:text-red-300 text-sm">
                                    <p className="font-semibold">เกิดข้อผิดพลาด</p>
                                    <p className="mt-1">{error}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <PresentationOutput isLoading={isLoading} textContent={textContent} />
        </motion.div>
    );
};

export default PresentationGenerator;
