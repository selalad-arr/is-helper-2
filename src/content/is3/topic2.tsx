import React from 'react';
import IS3ProjectPlanner from '../../components/IS3ProjectPlanner';
import { LightBulbIcon, UsersIcon, BeakerIcon, DocumentTextIcon, CheckIcon } from '../../ui/icons';

// FIX: Correctly typed `children` prop using React.PropsWithChildren.
const PlanSectionCard = ({ icon, title, children }: React.PropsWithChildren<{ icon: React.ReactNode, title: string }>) => (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 h-full">
        <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 text-sky-500">{icon}</div>
            <h5 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h5>
        </div>
        <div className="text-slate-700 dark:text-slate-300 space-y-1 pl-9">
            {children}
        </div>
    </div>
);


const Topic2 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การวางแผนโครงการเพื่อบริการสังคม</h3>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                หลังจากที่เราวิเคราะห์และเลือกปัญหาที่ต้องการแก้ไขได้จากบทที่แล้ว ขั้นตอนต่อไปที่สำคัญที่สุดคือ "การวางแผน" แผนโครงการที่ดีเปรียบเสมือนพิมพ์เขียวที่บอกเราว่าต้องทำอะไร, ทำเมื่อไหร่, ทำอย่างไร, และต้องการอะไรบ้าง เพื่อให้โครงการของเราสำเร็จลุล่วงตามเป้าหมาย
            </p>
            <p>
                การเขียนแผนโครงการ (Project Proposal) ไม่ใช่แค่เอกสารส่งครู แต่เป็นเครื่องมือที่ช่วยให้เราและเพื่อนร่วมทีมทำงานอย่างเป็นระบบและมีทิศทางเดียวกัน
            </p>

            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">องค์ประกอบสำคัญของแผนโครงการ</h4>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <PlanSectionCard icon={<LightBulbIcon className="w-6 h-6" />} title="1. หลักการและเหตุผล">
                    <p>อธิบายว่า "ทำไม" โครงการนี้จึงสำคัญ โดยเชื่อมโยงจากปัญหาที่วิเคราะห์ในบทที่ 1 ว่าโครงการของเราจะเข้าไปช่วยแก้ "สาเหตุ" ของปัญหาได้อย่างไร</p>
                </PlanSectionCard>
                <PlanSectionCard icon={<CheckIcon className="w-6 h-6" />} title="2. วัตถุประสงค์">
                    <p>บอกว่า "ต้องการทำอะไรให้สำเร็จ" ควรกำหนดให้ชัดเจน วัดผลได้ และทำได้จริง เช่น "เพื่อลดปริมาณขยะพลาสติกบนชายหาด A ลง 20% ภายใน 3 เดือน"</p>
                </PlanSectionCard>
                <PlanSectionCard icon={<UsersIcon className="w-6 h-6" />} title="3. กลุ่มเป้าหมาย">
                     <p>ระบุว่า "ใคร" คือผู้ที่จะได้รับประโยชน์จากโครงการนี้โดยตรง เช่น นักเรียน, ชาวบ้านในชุมชน, นักท่องเที่ยว</p>
                </PlanSectionCard>
                 <PlanSectionCard icon={<BeakerIcon className="w-6 h-6" />} title="4. วิธีดำเนินงาน">
                     <p>อธิบาย "ทำอย่างไร" เป็นขั้นตอนที่ชัดเจน ใคร ทำอะไร ที่ไหน เมื่อไหร่ เช่น 1. ประชุมวางแผน 2. ออกแบบสื่อรณรงค์ 3. จัดกิจกรรมเก็บขยะ</p>
                </PlanSectionCard>
                 <PlanSectionCard icon={<DocumentTextIcon className="w-6 h-6" />} title="5. ผลที่คาดว่าจะได้รับ">
                     <p>บอกว่าเมื่อสิ้นสุดโครงการแล้ว "จะเกิดผลดีอะไรขึ้นบ้าง" ทั้งในเชิงปริมาณ (เช่น ขยะลดลงกี่กิโลกรัม) และเชิงคุณภาพ (เช่น คนในชุมชนมีความตระหนักรู้มากขึ้น)</p>
                </PlanSectionCard>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">เครื่องมือช่วยเขียนแผนโครงการ (Project Plan Generator)</h4>
            <div className="mb-6 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-700">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <LightBulbIcon className="w-6 h-6 text-sky-500"/>
                    </div>
                    <div>
                        <h5 className="font-bold text-sky-800 dark:text-sky-300">วิธีใช้งานเครื่องมือ</h5>
                        <p className="mt-2 text-slate-700 dark:text-slate-300">
                            เครื่องมือนี้จะช่วยเปลี่ยนความคิดของคุณให้กลายเป็น "แผนโครงการ" ที่เป็นทางการและพร้อมนำเสนอ เพียงทำตามขั้นตอนง่ายๆ ดังนี้:
                        </p>
                        <ol className="list-decimal list-outside space-y-1 pl-5 mt-2 text-slate-700 dark:text-slate-300">
                            <li><strong>กรอกข้อมูลให้ครบถ้วน:</strong> ไล่กรอกรายละเอียดในแต่ละหัวข้อ ตั้งแต่ชื่อโครงการไปจนถึงผู้รับผิดชอบ ยิ่งข้อมูลละเอียด แผนของคุณก็จะยิ่งแข็งแรง</li>
                            <li><strong>เพิ่มรายการได้:</strong> ในส่วนของ "วัตถุประสงค์" และ "ผลที่คาดว่าจะได้รับ" คุณสามารถกดปุ่ม "+ เพิ่ม" เพื่อสร้างรายการเป็นข้อๆ ได้ตามต้องการ</li>
                            <li><strong>สร้างและดาวน์โหลด:</strong> เมื่อกรอกข้อมูลเสร็จสิ้น กดปุ่ม "สร้างและดาวน์โหลดแผนโครงการ (PDF)" ที่ด้านล่างสุด ระบบจะสร้างไฟล์เอกสารที่สวยงามและพร้อมใช้งานให้ทันที</li>
                        </ol>
                    </div>
                </div>
            </div>
            <IS3ProjectPlanner />
        </div>
    </div>
);

export default Topic2;
