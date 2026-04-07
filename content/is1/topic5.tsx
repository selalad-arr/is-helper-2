import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { DocumentArrowDownIcon } from '../../ui/icons';
import PrintableOutline from './PrintableOutline';

const FormSection = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{title}</h3>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const FormLabel = ({ children, htmlFor }: React.PropsWithChildren<{ htmlFor?: string }>) => (
    <label htmlFor={htmlFor} className="block text-base font-medium text-slate-800 dark:text-slate-200">
        {children}
    </label>
);

const Guideline = ({ children }: React.PropsWithChildren<{}>) => (
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2">
        <span className="font-semibold">แนวทาง:</span> {children}
    </p>
);

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        type="text" 
        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow text-slate-800 dark:text-slate-200"
        {...props}
    />
);

const FormTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea 
        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow text-slate-800 dark:text-slate-200"
        {...props}
    ></textarea>
);

const RubricRow = ({ criteria, levels }: { criteria: string, levels: string[] }) => (
    <tr className="bg-white dark:bg-slate-800/50">
        <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">{criteria}</td>
        {levels.map((level, index) => (
            <td key={index} className={`p-2 border border-slate-300 dark:border-slate-600`}>{level}</td>
        ))}
    </tr>
);

import { useFirestoreData } from '../../src/hooks/useFirestore';

const Topic5 = () => {
    const pdfContainerRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [printableData, setPrintableData] = useState<any | null>(null);

    const { data: projectData, updateData: updateProjectData } = useFirestoreData('user_projects', 'main', {
        topic5_form_data: JSON.stringify({
            title: '',
            members: '',
            advisor: '',
            background: '',
            objectives: ['', '', ''],
            hypotheses: ['', '', ''],
            duration: '',
            plan: '',
            tools: '',
            references: ['', '', ''],
            benefits: ['', '', ''],
            customCoverText: '',
            schoolName: '',
            semester: `ภาคเรียนที่ 1 ปีการศึกษา ${new Date().getFullYear() + 543}`
        })
    });

    const formData = JSON.parse(projectData.topic5_form_data || '{}');

    const setFormData = (newData: any | ((prev: any) => any)) => {
        const updatedData = typeof newData === 'function' ? newData(formData) : newData;
        updateProjectData({ topic5_form_data: JSON.stringify(updatedData) });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleListChange = (listName: 'objectives' | 'hypotheses' | 'references' | 'benefits', index: number, value: string) => {
        const newList = [...formData[listName]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [listName]: newList }));
    };
    

    useEffect(() => {
        if (!printableData || !isGenerating) return;

        const generatePdf = async () => {
            const pdfElement = pdfContainerRef.current;
            if (!pdfElement) {
                setIsGenerating(false);
                return;
            }
            
            try {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4',
                });
                
                await pdf.html(pdfElement, {
                    html2canvas: {
                        scale: (595.28 - 72 * 2) / 827, 
                        useCORS: true,
                        backgroundColor: '#ffffff',
                    },
                    autoPaging: 'text',
                    margin: [0, 0, 0, 0], // Margins handled by styled divs
                    fontFaces: [
                        {
                            family: 'Sarabun',
                            style: 'normal',
                            weight: 'normal',
                            src: [{
                                url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/sarabun/Sarabun-Regular.ttf',
                                format: 'truetype'
                            }]
                        },
                        {
                            family: 'Sarabun',
                            style: 'normal',
                            weight: 'bold',
                            src: [{
                                url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/sarabun/Sarabun-Bold.ttf',
                                format: 'truetype'
                            }]
                        }
                    ]
                });
                
                pdf.save('IS1-เค้าโครงโครงงาน.pdf');
            } catch (error) {
                console.error("Error generating PDF:", error);
                alert("เกิดข้อผิดพลาดในการสร้างไฟล์ PDF โปรดลองอีกครั้ง");
            } finally {
                setIsGenerating(false);
                setPrintableData(null);
            }
        };
        
        generatePdf();

    }, [printableData, isGenerating]);


    const handleGeneratePdf = () => {
        if (isGenerating) return;
        setPrintableData(formData);
        setIsGenerating(true);
    };


    return (
        <div>
            <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mt-4 mb-2">เครื่องมือช่วยเขียนเค้าโครงโครงงาน (IS1)</h3>
                <p className="text-slate-600 dark:text-slate-400">กรอกข้อมูลโครงงานของคุณในแต่ละหัวข้อ แล้วกดปุ่มท้ายสุดเพื่อสร้างเป็นไฟล์ PDF</p>
            </div>
            
            <div className="my-8">
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-sm text-left border-collapse">
                        <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                            📊 ตารางประเมินผล (Rubric) เค้าโครงโครงงาน IS1
                        </caption>
                        <thead className="text-xs text-slate-700 uppercase bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
                            <tr>
                                <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 w-1/5">เกณฑ์การประเมิน</th>
                                <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-emerald-100 dark:bg-emerald-900/50">6 (ดีเลิศ)</th>
                                <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-teal-100 dark:bg-teal-900/50">5 (ดีมาก)</th>
                                <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-cyan-100 dark:bg-cyan-900/50">4 (ดี)</th>
                                <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-sky-100 dark:bg-sky-900/50">3 (พอใช้)</th>
                                <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-amber-100 dark:bg-amber-900/50">2 (ควรปรับปรุง)</th>
                                <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-rose-100 dark:bg-rose-900/50">1 (ต้องปรับปรุง)</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <RubricRow criteria="1. ความครบถ้วน" levels={[
                                'มีหัวข้อครบถ้วนตามโครงสร้าง 11 ข้อ และมีเนื้อหาทุกหัวข้อ',
                                'มีหัวข้อครบถ้วน แต่เนื้อหาบางส่วนยังน้อย',
                                'มีหัวข้อหลักๆ ครบถ้วน แต่ขาดหัวข้อย่อย',
                                'ขาดหัวข้อสำคัญ 1-2 หัวข้อ',
                                'ขาดหัวข้อสำคัญหลายหัวข้อ',
                                'มีข้อมูลไม่ครบถ้วนอย่างยิ่ง'
                            ]} />
                            <RubricRow criteria="2. ความเป็นมาและความสำคัญ" levels={[
                                'เขียนได้น่าสนใจ มีโครงสร้าง 3 ส่วน (ต้น-กลาง-ปลาย) ชัดเจนและเชื่อมโยงกันดีเยี่ยม',
                                'เขียนได้ดี มีโครงสร้าง 3 ส่วนชัดเจน',
                                'มีโครงสร้าง 3 ส่วน แต่ยังเชื่อมโยงกันไม่ดี',
                                'เล่าที่มาได้ แต่ขาดโครงสร้างและความน่าสนใจ',
                                'เขียนไม่ตรงประเด็น',
                                'ไม่ได้เขียนความเป็นมาฯ'
                            ]} />
                            <RubricRow criteria="3. วัตถุประสงค์และสมมติฐาน" levels={[
                                'วัตถุประสงค์และสมมติฐานสอดคล้องกับชื่อเรื่องและวิธีการดำเนินงานอย่างสมบูรณ์',
                                'วัตถุประสงค์และสมมติฐานสอดคล้องกันดี',
                                'วัตถุประสงค์ชัดเจน แต่สมมติฐานยังไม่สอดคล้อง',
                                'วัตถุประสงค์ยังไม่ชัดเจน',
                                'วัตถุประสงค์กว้างเกินไป',
                                'ไม่มีวัตถุประสงค์'
                            ]} />
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-8">
                <FormSection title="ข้อมูลทั่วไปและหน้าปก">
                    <div>
                        <FormLabel htmlFor="title">1. ชื่อเรื่องหรือประเด็นปัญหา</FormLabel>
                        <Guideline>ตั้งชื่อเรื่องให้กระชับ ชัดเจน และสื่อถึงสิ่งที่ต้องการศึกษาหรือแก้ไขในโครงงานนี้</Guideline>
                        <FormInput id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="เช่น การศึกษาประสิทธิภาพของสารสกัดใบบัวบกในการยับยั้งเชื้อแบคทีเรีย" />
                    </div>
                    
                    <div>
                        <FormLabel htmlFor="members">2. รายชื่อสมาชิกกลุ่ม</FormLabel>
                        <Guideline>ระบุชื่อ-สกุล, ชั้น, และเลขที่ของสมาชิกทุกคนในกลุ่มให้ครบถ้วน</Guideline>
                        <FormTextarea id="members" name="members" value={formData.members} onChange={handleInputChange} rows={6} placeholder="กรอกชื่อ-สกุล, ชั้น, เลขที่ ของสมาชิกแต่ละคน (คนละ 1 บรรทัด)" />
                    </div>

                    <div>
                        <FormLabel htmlFor="advisor">3. ครูที่ปรึกษาประจำกลุ่ม</FormLabel>
                        <Guideline>ระบุชื่อ-สกุลของคุณครูที่ปรึกษาโครงงาน</Guideline>
                        <FormInput id="advisor" name="advisor" value={formData.advisor} onChange={handleInputChange} placeholder="คุณครู..." />
                    </div>

                    <div>
                        <FormLabel htmlFor="customCoverText">ข้อความหน้าปก (ถ้ามี)</FormLabel>
                        <Guideline>เช่น "รายงานนี้เป็นส่วนหนึ่งของรายวิชา..." หรือ "โครงงานนี้ใช้ในการแข่งขัน..."</Guideline>
                        <FormTextarea id="customCoverText" name="customCoverText" value={formData.customCoverText} onChange={handleInputChange} rows={3} placeholder="ข้อความที่จะแสดงเพิ่มเติมบนหน้าปก..." />
                    </div>

                    <div>
                        <FormLabel htmlFor="schoolName">ชื่อโรงเรียน</FormLabel>
                        <FormInput id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleInputChange} placeholder="เช่น โรงเรียนคลองใหญ่วิทยาคม" />
                    </div>

                    <div>
                        <FormLabel htmlFor="semester">ภาคเรียน/ปีการศึกษา</FormLabel>
                        <FormInput id="semester" name="semester" value={formData.semester} onChange={handleInputChange} />
                    </div>
                </FormSection>

                <FormSection title="เนื้อหาโครงงาน">
                    <div>
                        <FormLabel htmlFor="background">4. ความเป็นมาและความสำคัญของเรื่องที่ศึกษา</FormLabel>
                        <Guideline>ในส่วนนี้ ให้อธิบายที่มาของโครงงานโดยแบ่งเป็น 3 ส่วน: ส่วนต้น (ภาพรวมปัญหา), ส่วนกลาง (ข้อมูล/ทฤษฎีที่เกี่ยวข้อง), และส่วนปลาย (ที่มาของโครงงานจากประสบการณ์จริง) เพื่อชี้ให้เห็นว่าทำไมโครงงานนี้จึงสำคัญและน่าสนใจ</Guideline>
                        <FormTextarea id="background" name="background" value={formData.background} onChange={handleInputChange} rows={8} placeholder="อธิบายที่มาของโครงงานตามโครงสร้าง ส่วนต้น-กลาง-ปลาย..." />
                    </div>

                    <div>
                        <FormLabel>5. วัตถุประสงค์ของการศึกษาค้นคว้า</FormLabel>
                        <Guideline>เขียนเป็นข้อๆ ให้ชัดเจน โดยควรขึ้นต้นด้วยคำว่า "เพื่อศึกษา...", "เพื่อเปรียบเทียบ...", "เพื่อพัฒนา..." และต้องสอดคล้องกับชื่อเรื่องของโครงงาน</Guideline>
                        {formData.objectives.map((obj, i) => (
                            <FormInput key={i} value={obj} onChange={e => handleListChange('objectives', i, e.target.value)} placeholder={`วัตถุประสงค์ข้อ ${i + 1}`} className="mb-2 last:mb-0" />
                        ))}
                    </div>

                    <div>
                        <FormLabel>6. สมมติฐานการศึกษาค้นคว้า (ถ้ามี)</FormLabel>
                        <Guideline>ตั้งสมมติฐานที่คาดเดาคำตอบของปัญหาล่วงหน้าอย่างมีเหตุผล ควรอยู่ในรูปแบบ "ถ้า... ดังนั้น..." เพื่อแสดงความสัมพันธ์ระหว่างตัวแปรต้นและตัวแปรตาม</Guideline>
                         {formData.hypotheses.map((hyp, i) => (
                            <FormInput key={i} value={hyp} onChange={e => handleListChange('hypotheses', i, e.target.value)} placeholder={`สมมติฐานข้อ ${i + 1}`} className="mb-2 last:mb-0" />
                        ))}
                    </div>
                </FormSection>

                <FormSection title="แผนการดำเนินงาน">
                    <div>
                        <FormLabel htmlFor="duration">7. ระยะเวลาในการศึกษาค้นคว้า</FormLabel>
                        <Guideline>ระบุช่วงเวลาเริ่มต้นและสิ้นสุดของโครงการ เช่น "1 มิถุนายน 2567 - 31 กรกฎาคม 2567"</Guideline>
                        <FormInput id="duration" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="เช่น ภาคเรียนที่ 1 ปีการศึกษา 2567" />
                    </div>
                    
                    <div>
                        <FormLabel htmlFor="plan">8. วิธีการดำเนินงาน (P-Plan, D-do, A-act, C-check)</FormLabel>
                        <Guideline>อธิบายขั้นตอนการทำงานทั้งหมดอย่างละเอียด ตั้งแต่การวางแผน (Plan), การลงมือทำ (Do), การตรวจสอบ (Check), และการปรับปรุง (Act) รวมถึงระบุผู้รับผิดชอบในแต่ละขั้นตอน</Guideline>
                        <FormTextarea 
                            id="plan" 
                            name="plan" 
                            value={formData.plan} 
                            onChange={handleInputChange} 
                            rows={10} 
                            placeholder="อธิบายขั้นตอนการดำเนินงาน, ระยะเวลา, และผู้รับผิดชอบในแต่ละขั้นตอน..."
                        />
                    </div>
                    
                    <div>
                        <FormLabel htmlFor="tools">9. เครื่องมือที่ใช้ในการศึกษาค้นคว้า</FormLabel>
                        <Guideline>ระบุเครื่องมือ อุปกรณ์ หรือโปรแกรมที่ใช้ในการรวบรวมและวิเคราะห์ข้อมูล เช่น แบบสอบถาม, อุปกรณ์ในห้องปฏิบัติการ, โปรแกรมวิเคราะห์ทางสถิติ</Guideline>
                        <FormInput id="tools" name="tools" value={formData.tools} onChange={handleInputChange} placeholder="แบบสอบถาม, ชุดทดลองการสกัดสาร, โปรแกรม SPSS เป็นต้น" />
                    </div>
                </FormSection>

                <FormSection title="สรุปและอ้างอิง">
                    <div>
                        <FormLabel>10. เอกสารอ้างอิง (หาข้อมูลมาจากที่ไหนบ้าง)</FormLabel>
                        <Guideline>รวบรวมรายชื่อหนังสือ, เว็บไซต์, งานวิจัย หรือแหล่งข้อมูลอื่นๆ ที่นำมาใช้อ้างอิงในการทำโครงงานนี้</Guideline>
                         {formData.references.map((ref, i) => (
                            <FormInput key={i} value={ref} onChange={e => handleListChange('references', i, e.target.value)} placeholder={`ผู้แต่ง. (ปี). ชื่อเรื่อง. แหล่งที่มา.`} className="mb-2 last:mb-0" />
                        ))}
                    </div>
                    
                    <div>
                        <FormLabel>11. ประโยชน์ที่ได้รับ (คาดว่าจะเกิดประโยชน์อย่างไร)</FormLabel>
                        <Guideline>คาดการณ์ว่าผลจากการทำโครงงานนี้จะก่อให้เกิดประโยชน์ต่อใคร หรือต่อส่วนรวมในด้านใดบ้าง</Guideline>
                         {formData.benefits.map((ben, i) => (
                            <FormInput key={i} value={ben} onChange={e => handleListChange('benefits', i, e.target.value)} placeholder={`ประโยชน์ข้อ ${i + 1}`} className="mb-2 last:mb-0" />
                        ))}
                    </div>
                </FormSection>

                {printableData && (
                    <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                        <div ref={pdfContainerRef}>
                            <PrintableOutline values={printableData} />
                        </div>
                    </div>
                )}


                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 flex justify-center">
                    <button
                        onClick={handleGeneratePdf}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-3 justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-emerald-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-transform hover:scale-105"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                กำลังสร้าง PDF...
                            </>
                        ) : (
                            <>
                                <DocumentArrowDownIcon className="w-6 h-6" />
                                สร้างและดาวน์โหลดเป็น PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

             <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <div>
                        <h4 className="text-base font-medium text-slate-900 dark:text-white">ผลการพิจารณาของครูที่ปรึกษาประจำกลุ่ม</h4>
                        <div className="mt-2 flex items-center space-x-4">
                            <label className="flex items-center"><input type="radio" name="approval" className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"/> <span className="ml-2 text-slate-900 dark:text-white">อนุมัติเรื่องหรือประเด็นปัญหา</span></label>
                            <label className="flex items-center"><input type="radio" name="approval" className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"/> <span className="ml-2 text-slate-900 dark:text-white">ไม่อนุมัติเรื่องหรือประเด็นปัญหา</span></label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-slate-900 dark:text-white">ข้อเสนอแนะ (สำหรับครูที่ปรึกษาประจำกลุ่ม)</label>
                        <FormTextarea rows={4} className="mt-2" />
                    </div>
                    <div className="text-right">
                        <p className="text-slate-900 dark:text-white">ลงชื่อ.......................................................... ครูที่ปรึกษาประจำกลุ่ม</p>
                        <p className="text-slate-900 dark:text-white">(..........................................................)</p>
                        <p className="text-slate-900 dark:text-white">............../............../..............</p>
                    </div>
                </div>

        </div>
    );
};

export default Topic5;
