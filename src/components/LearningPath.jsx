import React, { useState } from 'react';
import modules from '../data/learningData.json';

const LearningPath = () => {
  const [activeModule, setActiveModule] = useState(1);

  return (
    <div className="learning-path-container fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}><i className='bx bx-book-reader' style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Lộ trình học tập</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '4px' }}>Hệ thống kiến thức nền tảng và kịch bản chốt đơn dành cho Trainee</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="stat-box" style={{ padding: '8px 16px' }}>
            <span className="stat-box-title">Tiến độ</span>
            <span className="stat-box-value" style={{ fontSize: '1.1rem' }}>0%</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '500px' }}>
        {/* Sidebar Modules */}
        <div className="card" style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', backgroundColor: '#F8F9FA' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Chương trình đào tạo (Level 1)</h3>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
              <div style={{ width: '0%', height: '100%', background: 'var(--primary)' }}></div>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {modules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  cursor: 'pointer',
                  backgroundColor: activeModule === mod.id ? 'var(--primary-glow)' : 'transparent',
                  border: activeModule === mod.id ? '1px solid var(--primary)' : '1px solid transparent',
                  transition: 'all 0.2s',
                  marginBottom: '8px'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: mod.completed ? 'var(--success)' : (activeModule === mod.id ? 'var(--primary)' : '#f3f4f6'),
                  color: mod.completed || activeModule === mod.id ? '#fff' : 'var(--text-muted)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>
                  {mod.completed ? <i className='bx bx-check'></i> : (mod.type === 'pdf' ? <i className='bx bx-slideshow'></i> : <i className='bx bx-file'></i>)}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: activeModule === mod.id ? 'var(--primary)' : 'var(--text-main)', lineHeight: '1.4' }}>{mod.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#e5e7eb', padding: '2px 6px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>{mod.type === 'pdf' ? 'SLIDE' : 'TÀI LIỆU'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Viewer Area */}
        <div className="card" style={{ flex: '2.5', display: 'flex', flexDirection: 'column', padding: '24px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{modules.find(m => m.id === activeModule)?.title}</h3>
              <button className="btn btn-outline"><i className='bx bx-download'></i> Tải tài liệu gốc</button>
            </div>

            {/* Document Viewer */}
            <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              {modules.find(m => m.id === activeModule)?.type === 'pdf' ? (
                <iframe 
                  src={modules.find(m => m.id === activeModule)?.pdfUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none', display: 'block' }}
                  title="PDF Viewer"
                ></iframe>
              ) : (
                <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: '1.6', color: '#333', margin: 0 }}>
                    {modules.find(m => m.id === activeModule)?.content || "Nội dung chưa cập nhật"}
                  </pre>
                </div>
              )}
            </div>



            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={() => setActiveModule(prev => prev < modules.length ? prev + 1 : 1)}>
                Đánh dấu hoàn thành & Học bài tiếp theo <i className='bx bx-right-arrow-alt'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
