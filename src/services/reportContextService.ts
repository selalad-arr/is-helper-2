import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const fetchFullReportContext = async (uid: string, classId: string): Promise<string> => {
    try {
        const compositeId = `${uid}_${classId}`;
        const stepMapping = [
            { ch: 1, id: '5' }, { ch: 2, id: '8' }, { ch: 3, id: '11' }, { ch: 4, id: '13' }, { ch: 5, id: '15' }
        ];
        const compiled: string[] = [];
        
        for (const map of stepMapping) {
            const snap = await getDoc(doc(db, 'user_chapters', compositeId, 'chapters', map.id));
            if (snap.exists()) {
                const d = snap.data();
                const inputs = d.studentInputs ? JSON.parse(d.studentInputs) : {};
                const guideline = d.guideline ? JSON.parse(d.guideline) : null;
                if (guideline) {
                    compiled.push(`[บทที่ ${map.ch}: ${guideline.title}]`);
                    guideline.sections.forEach((sec: any, sIdx: number) => {
                        const inputKey = `${map.ch}_${sIdx}`;
                        if (inputs[inputKey]) {
                            compiled.push(`${sec.header}: ${inputs[inputKey]}`);
                        }
                    });
                }
            }
        }
        return compiled.join('\n');
    } catch (err) {
        console.error("Error fetching report context:", err);
        return "";
    }
};
