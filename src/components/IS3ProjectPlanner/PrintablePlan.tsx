import React from 'react';

const pdfStyles: { [key: string]: React.CSSProperties } = {
    page: {
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'THSarabunPSK, sans-serif',
        width: '827px',
        boxSizing: 'border-box',
    },
    h1: { fontSize: '18pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '24pt' },
    h2: { fontSize: '16pt', fontWeight: 'bold', marginTop: '16pt', marginBottom: '8pt', borderBottom: '1px solid #ccc', paddingBottom: '4pt' },
    p: { fontSize: '14pt', lineHeight: 1.6, marginBottom: '12pt', textIndent: '2rem', textAlign: 'justify' },
    li: { fontSize: '14pt', lineHeight: 1.6, marginBottom: '8pt', textAlign: 'justify' },
    label: { fontWeight: 'bold' },
    section: { marginBottom: '16pt' },
    signature: { marginTop: '40pt', textAlign: 'center', fontSize: '14pt' },
};

const PrintablePlan = ({ values }: { values: any }) => (
    <div style={pdfStyles.page}>
        <h1 style={pdfStyles.h1}>แผนโครงการบริการสังคม (IS3)</h1>

        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>1. ชื่องาน/โครงการ:</strong> {values.title || '...'}</p>
        </div>
        
        <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>2. หลักการและเหตุผล</h2>
             <p style={pdfStyles.p}>{values.rationale || '...'}</p>
        </div>

        <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>3. วัตถุประสงค์</h2>
             <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                {values.objectives.map((obj: string, i: number) => obj && <li key={i} style={pdfStyles.li}>{obj}</li>)}
             </ol>
        </div>
        
         <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>4. กลุ่มเป้าหมาย:</strong> {values.targetAudience || '...'}</p>
        </div>

        <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>5. วิธีดำเนินงาน</h2>
             <p style={pdfStyles.p}>{values.methodology || '...'}</p>
        </div>
        
        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>6. ระยะเวลาดำเนินงาน:</strong> {values.timeline || '...'}</p>
        </div>
        
        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>7. งบประมาณ:</strong> {values.budget || '...'}</p>
        </div>

         <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>8. ผลที่คาดว่าจะได้รับ</h2>
               <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                {values.outcomes.map((o: string, i: number) => o && <li key={i} style={pdfStyles.li}>{o}</li>)}
             </ol>
        </div>
        
        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>9. ผู้รับผิดชอบโครงการ:</strong> {values.responsible || '...'}</p>
        </div>

        <div style={pdfStyles.signature}>
            <p>ลงชื่อ.......................................................... ผู้เสนอโครงการ</p>
            <p>({values.responsible || '..........................................................'})</p>
            <p>............../............../..............</p>
        </div>
    </div>
);

export default PrintablePlan;
