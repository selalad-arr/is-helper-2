import React from 'react';

const pdfStyles: { [key: string]: React.CSSProperties } = {
    page: {
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'THSarabunPSK, sans-serif',
        width: '827px',
        boxSizing: 'border-box',
        overflowWrap: 'break-word',
    },
    h1: { fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '24pt' },
    h2: { fontSize: '18pt', fontWeight: 'bold', marginTop: '18pt', marginBottom: '10pt' },
    p: { fontSize: '16pt', lineHeight: 1.6, marginBottom: '12pt', overflowWrap: 'break-word' },
    li: { fontSize: '16pt', lineHeight: 1.6, marginBottom: '10pt', overflowWrap: 'break-word' },
    label: { fontWeight: 'bold', display: 'inline' },
    value: { fontWeight: 'normal', display: 'inline', marginLeft: '8px' },
    section: { marginBottom: '18pt' },
    signature: { marginTop: '40pt', textAlign: 'right', fontSize: '16pt' },
};

const PrintableOutline = ({ values }: { values: any }) => {
    const renderListItems = (items: string[]) => {
        const nonEmptyItems = items.filter(item => item && item.trim());
        if (nonEmptyItems.length === 0) {
            return <li style={pdfStyles.li}>...</li>;
        }
        return nonEmptyItems.map((item, i) => <li key={i} style={pdfStyles.li}>{item}</li>);
    };

    return (
    <div style={{ width: '827px' }}>
        {/* Page 1: Cover Page */}
        <div style={{ ...pdfStyles.page, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '1170px', padding: '60pt 72pt' }}>
            <div style={{ textAlign: 'center' }}>
                <p style={{...pdfStyles.p, fontSize: '20pt'}}>เค้าโครงการศึกษาค้นคว้าและสร้างองค์ความรู้ (Independent Study : IS1)</p>
                <p style={{...pdfStyles.p, fontSize: '24pt', fontWeight: 'bold', marginTop: '4rem', wordBreak: 'break-word'}}>{values.title || '...'}</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
                 <p style={{...pdfStyles.p, whiteSpace: 'pre-wrap'}}>{values.customCoverText || ''}</p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <p style={{...pdfStyles.p, marginBottom: '1rem' }}>โดย</p>
                <p style={{...pdfStyles.p, fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>{values.members || '...'}</p>

                <p style={{...pdfStyles.p, marginTop: '3rem', marginBottom: '1rem' }}>เสนอ</p>
                <p style={{...pdfStyles.p, fontWeight: 'bold' }}>{values.advisor || '...'}</p>

                <p style={{...pdfStyles.p, marginTop: '5rem' }}>{values.schoolName || '...'}</p>
                <p style={{...pdfStyles.p, fontSize: '14pt' }}>{values.semester || '...'}</p>
            </div>
        </div>

        {/* Page 2 onwards: Content */}
        <div style={{ ...pdfStyles.page, pageBreakBefore: 'always', padding: '60pt 72pt' }}>
            <div style={{...pdfStyles.section, pageBreakInside: 'avoid'}}>
                <h2 style={{...pdfStyles.h2, marginTop: 0}}>1. ชื่อเรื่องหรือประเด็นปัญหา:</h2>
                <p style={{...pdfStyles.p, textIndent: 0}}>{values.title || '...'}</p>
            </div>

            <div style={{...pdfStyles.section, pageBreakInside: 'avoid'}}>
                <h2 style={pdfStyles.h2}>2. รายชื่อสมาชิกกลุ่ม</h2>
                <p style={{...pdfStyles.p, whiteSpace: 'pre-wrap', textIndent: 0, textAlign: 'left' }}>{values.members || '...'}</p>
            </div>

            <div style={{...pdfStyles.section, pageBreakInside: 'avoid'}}>
                <h2 style={pdfStyles.h2}>3. ครูที่ปรึกษาประจำกลุ่ม:</h2>
                <p style={{...pdfStyles.p, textIndent: 0}}>{values.advisor || '...'}</p>
            </div>
            
            <div style={pdfStyles.section}>
                 <h2 style={pdfStyles.h2}>4. ความเป็นมาและความสำคัญของเรื่องที่ศึกษาหรือประเด็นปัญหา</h2>
                 <p style={{...pdfStyles.p, textIndent: '2.5rem', textAlign: 'justify'}}>{values.background || '...'}</p>
            </div>

            <div style={pdfStyles.section}>
                 <h2 style={pdfStyles.h2}>5. วัตถุประสงค์ของการศึกษาค้นคว้า</h2>
                 <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                    {renderListItems(values.objectives)}
                 </ol>
            </div>

            <div style={pdfStyles.section}>
                 <h2 style={pdfStyles.h2}>6. สมมติฐานการศึกษาค้นคว้า (ถ้ามี)</h2>
                  <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                    {renderListItems(values.hypotheses)}
                </ol>
            </div>

            <div style={{...pdfStyles.section, pageBreakInside: 'avoid'}}>
                <h2 style={pdfStyles.h2}>7. ระยะเวลาในการศึกษาค้นคว้า:</h2>
                <p style={{...pdfStyles.p, textIndent: 0}}>{values.duration || '...'}</p>
            </div>
            
            <div style={pdfStyles.section}>
                 <h2 style={pdfStyles.h2}>8. วิธีการดำเนินงาน</h2>
                 <p style={{...pdfStyles.p, textIndent: '2.5rem', textAlign: 'justify', whiteSpace: 'pre-wrap'}}>{values.plan || '...'}</p>
            </div>

             <div style={{...pdfStyles.section, pageBreakInside: 'avoid'}}>
                <h2 style={pdfStyles.h2}>9. เครื่องมือที่ใช้ในการศึกษาค้นคว้า:</h2>
                <p style={{...pdfStyles.p, textIndent: 0}}>{values.tools || '...'}</p>
            </div>

             <div style={pdfStyles.section}>
                 <h2 style={pdfStyles.h2}>10. เอกสารอ้างอิง</h2>
                  <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                    {renderListItems(values.references)}
                </ol>
            </div>
            
             <div style={pdfStyles.section}>
                 <h2 style={pdfStyles.h2}>11. ประโยชน์ที่ได้รับ</h2>
                  <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                    {renderListItems(values.benefits)}
                </ol>
            </div>

            <div style={pdfStyles.signature}>
                <p>ลงชื่อ.......................................................... ครูที่ปรึกษาประจำกลุ่ม</p>
                <p>({values.advisor || '..........................................................'})</p>
                <p>............../............../..............</p>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '50pt' }}>
                 <p style={{ color: '#cccccc', fontSize: '9pt', fontFamily: 'THSarabunPSK, sans-serif' }}>
                    สร้างมาจาก IS Helper
                </p>
            </div>
        </div>
    </div>
    );
};

export default PrintableOutline;
