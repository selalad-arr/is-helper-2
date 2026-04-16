import React from 'react';
import { A4Page } from './A4Page';

interface CoverPageProps {
    projectTitle: string;
    authorName: string;
    customCoverText: string;
    subjectName: string;
    subjectCode: string;
    schoolName: string;
    semester: string;
    totalPages: number;
}

const CoverPage: React.FC<CoverPageProps> = ({
    projectTitle, authorName, customCoverText,
    subjectName, subjectCode, schoolName, semester,
    totalPages
}) => {
    return (
        <A4Page pageNumber={1} totalPages={totalPages}>
            <div className="h-full flex flex-col justify-between text-center pt-24 pb-24 text-black">
                <div>
                    <h1 className="text-[28pt] font-bold mb-10 leading-tight">{projectTitle}</h1>
                </div>
                <div className="my-10">
                    <p className="text-[18pt]">โดย</p>
                    <p className="text-[22pt] font-bold mt-4 whitespace-pre-wrap">{authorName || '...'}</p>
                </div>
                <div className="space-y-4">
                    <p className="text-[16pt] whitespace-pre-wrap">{customCoverText}</p>
                    <p className="text-[17pt] font-bold">รายวิชา {subjectName} {subjectCode ? `(${subjectCode})` : ''}</p>
                    <p className="text-[17pt]">{schoolName}</p>
                    <p className="text-[17pt]">{semester || `ภาคเรียนที่ 1 ปีการศึกษา 2567`}</p>
                </div>
            </div>
        </A4Page>
    );
};

export default CoverPage;
