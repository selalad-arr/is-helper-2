import React from 'react';
import Topic1CardFlow from '../../components/Topic1CardFlow';
import { useProjectData } from '../../hooks/useProjectData';

const Topic1Exercise = () => {
    const { is1ProjectTitle, setIs1ProjectTitle } = useProjectData();

    return (
        <div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
                มาลองใช้ AI ผู้ช่วยในการค้นหาและพัฒนาแนวคิดโครงงานของคุณกันเถอะ! AI จะถามคำถามเพื่อนำทางคุณไปสู่หัวข้อโครงงานที่น่าสนใจและทำได้จริง
            </p>
            <Topic1CardFlow projectTitle={is1ProjectTitle} setProjectTitle={setIs1ProjectTitle} />
        </div>
    );
};

export default Topic1Exercise;
