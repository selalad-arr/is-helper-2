import React from 'react';

const PagePreview: React.FC<React.PropsWithChildren<{ className?: string, style?: React.CSSProperties }>> = ({ children, className, style }) => (
    <div 
        className="printable-page"
        style={{ 
            backgroundColor: '#ffffff', 
            color: '#000000', 
            ...style, 
            pageBreakAfter: 'always' 
        }}
    >
        {children}
    </div>
);

const pdfStyles: { [key: string]: React.CSSProperties } = {
    chapterTitle: { fontFamily: 'THSarabunPSK, sans-serif', fontWeight: 700, fontSize: '22pt', textAlign: 'center', marginBottom: '2rem', lineHeight: 1.4 },
    mainHeading: { fontFamily: 'THSarabunPSK, sans-serif', fontWeight: 700, fontSize: '18pt', marginBottom: '0.5rem' },
    bodyText: { fontFamily: 'THSarabunPSK, sans-serif', fontWeight: 400, fontSize: '16pt', lineHeight: 1.7 },
    bodyTextJustify: { fontFamily: 'THSarabunPSK, sans-serif', fontWeight: 400, fontSize: '16pt', textIndent: '2.5rem', textAlign: 'justify', lineHeight: 1.7 },
    coverTitle: { fontFamily: 'THSarabunPSK, sans-serif', fontWeight: 700, fontSize: '28pt', marginTop: '1rem', lineHeight: 1.3, wordBreak: 'break-word' },
    coverAuthor: { fontFamily: 'THSarabunPSK, sans-serif', fontWeight: 700, fontSize: '18pt', whiteSpace: 'pre-wrap' },
    tocEntry: { fontFamily: 'THSarabunPSK, sans-serif', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    tocDots: { flexGrow: 1, borderBottom: '1px dotted #333', margin: '0 0.5rem', transform: 'translateY(-4px)' }
};


const PrintableReport: React.FC<any> = ({
    reportStructure, 
    studentInputs = {}, 
    projectAbstract = '', 
    authorName = '',
    acknowledgements = '', 
    references = '', 
    customCoverText = '', 
    schoolName = '', 
    semester = '',
    subjectName = '', 
    subjectCode = '',
    userData = null
}) => {
    return (
        <div style={{ width: '827px', backgroundColor: '#ffffff', color: '#000000' }}>
            {/* Page 1: Cover */}
            <PagePreview>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center', minHeight: '1170px', padding: '1.5in 1in 1in 1.5in' }}>
                    <div style={{paddingTop: '60pt'}}>
                        <p style={pdfStyles.coverTitle}>{reportStructure?.title || '...'}</p>
                    </div>
                    <div>
                        <p style={pdfStyles.bodyText}>โดย</p>
                        <p style={pdfStyles.coverAuthor}>{authorName || '...'}</p>
                    </div>
                    <div style={{paddingBottom: '60pt'}}>
                        <p style={{...pdfStyles.bodyText, whiteSpace: 'pre-wrap'}}>{customCoverText}</p>
                        {subjectName && (
                            <p style={pdfStyles.bodyText}>รายงานฉบับนี้เป็นส่วนหนึ่งของรายวิชา {subjectName} {subjectCode ? `(${subjectCode})` : ''}</p>
                        )}
                        <p style={{...pdfStyles.bodyText, marginTop: '1rem'}}>{schoolName}</p>
                        <p style={pdfStyles.bodyText}>{semester}</p>
                    </div>
                </div>
            </PagePreview>

            {/* Page 2: Abstract */}
            <PagePreview style={{ padding: '1.5in 1in 1in 1.5in', minHeight: '1170px' }}>
                <h1 style={pdfStyles.chapterTitle}>บทคัดย่อ</h1>
                <p style={pdfStyles.bodyTextJustify} dangerouslySetInnerHTML={{ __html: projectAbstract.replace(/\n/g, '<br />') || '[ยังไม่ได้กรอกบทคัดย่อ]' }}></p>
            </PagePreview>
            
            {/* Page 3: Acknowledgements */}
            <PagePreview style={{ padding: '1.5in 1in 1in 1.5in', minHeight: '1170px' }}>
                <h1 style={pdfStyles.chapterTitle}>กิตติกรรมประกาศ</h1>
                <p style={pdfStyles.bodyTextJustify} dangerouslySetInnerHTML={{ __html: acknowledgements.replace(/\n/g, '<br />') || '[ยังไม่ได้กรอกกิตติกรรมประกาศ]' }}></p>
            </PagePreview>
            
            {/* Page 4: Table of Contents */}
            <PagePreview style={{ padding: '1.5in 1in 1in 1.5in', minHeight: '1170px' }}>
                <h1 style={pdfStyles.chapterTitle}>สารบัญ</h1>
                <div style={{ ...pdfStyles.bodyText, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={pdfStyles.tocEntry}><span>บทคัดย่อ</span><span style={pdfStyles.tocDots}></span><span>ข</span></div>
                    <div style={pdfStyles.tocEntry}><span>กิตติกรรมประกาศ</span><span style={pdfStyles.tocDots}></span><span>ค</span></div>
                    {reportStructure?.chapters.map((chapter: any) => (
                        <div key={`toc-ch-${chapter.chapter_number}`} style={{ marginTop: '1rem' }}>
                            <div style={{...pdfStyles.tocEntry, ...pdfStyles.mainHeading, fontSize: '16pt'}}><span style={{ paddingRight: '0.5rem' }}>บทที่ {chapter.chapter_number} {chapter.title}</span><span style={pdfStyles.tocDots}></span><span>...</span></div>
                            <div style={{ marginLeft: '2rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 'normal' }}>
                                {chapter.sections.map((section: any, i: number) => (
                                    <div key={`toc-sec-${i}`} style={pdfStyles.tocEntry}><span>{chapter.chapter_number}.{i+1} {section.header}</span><span style={pdfStyles.tocDots}></span><span>...</span></div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div style={{...pdfStyles.tocEntry, ...pdfStyles.mainHeading, fontSize: '16pt', marginTop: '1rem'}}><span>เอกสารอ้างอิง</span><span style={pdfStyles.tocDots}></span><span>...</span></div>
                </div>
            </PagePreview>

            {/* Content Pages */}
            {reportStructure?.chapters.map((chapter: any) => (
                <PagePreview key={`ch-page-${chapter.chapter_number}`} style={{ padding: '1.5in 1in 1in 1.5in', minHeight: '1170px' }}>
                    <h1 style={pdfStyles.chapterTitle}>บทที่ {chapter.chapter_number}<br/>{chapter.title}</h1>
                    {chapter.sections.map((section: any, i: number) => {
                        const key = `${chapter.chapter_number}_${i}`;
                        const content = studentInputs[key] ? studentInputs[key].replace(/\n/g, '<br />') : `[ยังไม่มีเนื้อหาสำหรับหัวข้อ "${section.header}"]`;
                        return (
                        <div key={`content-${key}`} style={{ marginBottom: '1.5rem' }}>
                            <h2 style={pdfStyles.mainHeading}>{chapter.chapter_number}.{i + 1} {section.header}</h2>
                            <p style={pdfStyles.bodyTextJustify} dangerouslySetInnerHTML={{ __html: content }}></p>
                        </div>
                    )})}
                </PagePreview>
            ))}

            {/* References Page */}
            <PagePreview style={{ padding: '1.5in 1in 1in 1.5in', minHeight: '1170px' }}>
                <h1 style={pdfStyles.chapterTitle}>เอกสารอ้างอิง</h1>
                <p style={pdfStyles.bodyText} dangerouslySetInnerHTML={{ __html: references.replace(/\n/g, '<br />') || '[ยังไม่ได้กรอกเอกสารอ้างอิง]' }}></p>
                 {!(userData?.isPremium || (typeof window !== 'undefined' && !!localStorage.getItem('custom_gemini_api_key'))) && (
                     <div style={{ textAlign: 'center', paddingTop: '50pt' }}>
                         <p style={{ color: '#cccccc', fontSize: '9pt', fontFamily: 'THSarabunPSK, sans-serif' }}>
                            สร้างมาจาก IS Helper
                        </p>
                    </div>
                 )}
            </PagePreview>
        </div>
    );
};

export default PrintableReport;
