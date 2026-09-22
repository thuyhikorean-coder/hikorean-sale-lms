import React, { useState } from 'react';
import aboutData from '../data/aboutData.json';

const AboutHikorean = () => {
  const [activeTab, setActiveTab] = useState('catalogue');

  const activeItem = aboutData.find(item => item.id === activeTab);

  return (
    <div className="about-container fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="card" style={{ padding: '32px', background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', color: '#fff' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px' }}>Giới thiệu Hi Korean</h2>
        <p style={{ fontSize: '0.95rem', fontWeight: 500, opacity: 0.9 }}>
          Thư viện thông tin về Thương hiệu, Hệ thống Khóa học và Chính sách Học phí mới nhất dành cho Tư vấn viên.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '500px' }}>
        {/* Sidebar Menu */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', paddingLeft: '8px' }}>Danh mục Thông tin</h4>
          {aboutData.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                textAlign: 'left', 
                padding: '16px', 
                borderRadius: '12px', 
                border: item.id === activeTab ? '1px solid var(--primary)' : '1px solid transparent', 
                backgroundColor: activeTab === item.id ? 'var(--primary-glow)' : '#fff',
                color: activeTab === item.id ? 'var(--primary-hover)' : 'var(--text-main)',
                fontWeight: activeTab === item.id ? 800 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: activeTab === item.id ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <i className={`bx ${item.icon}`} style={{ fontSize: '1.4rem' }}></i>
              <span style={{ flex: 1, lineHeight: '1.3' }}>{item.title}</span>
              {item.type === 'pdf' && <span style={{ fontSize: '0.65rem', padding: '2px 6px', backgroundColor: activeTab === item.id ? 'var(--primary)' : '#e5e7eb', color: activeTab === item.id ? '#fff' : 'var(--text-muted)', borderRadius: '4px', fontWeight: 800 }}>PDF</span>}
            </button>
          ))}
        </div>

        {/* Content Viewer */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className={`bx ${activeItem?.icon}`} style={{ color: 'var(--primary)' }}></i>
              {activeItem?.title}
            </h3>
            {(activeItem?.type === 'pdf' || activeItem?.type === 'image') && (
              <a href={activeItem.url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                <i className='bx bx-link-external'></i> Mở tab mới
              </a>
            )}
          </div>
          
          <div style={{ flex: 1, backgroundColor: activeItem?.type === 'pdf' ? '#e5e5e5' : '#fff', overflow: 'hidden' }}>
            {activeItem?.type === 'pdf' ? (
              <iframe 
                src={activeItem.url} 
                width="100%" 
                height="100%" 
                style={{ border: 'none', display: 'block' }}
                title={activeItem.title}
              ></iframe>
            ) : activeItem?.type === 'image' ? (
              <div style={{ padding: '24px', height: '100%', overflowY: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {activeItem.urls ? activeItem.urls.map((imgUrl, idx) => (
                  <img key={idx} src={imgUrl} alt={`${activeItem.title} ${idx+1}`} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                )) : (
                  <img src={activeItem.url} alt={activeItem.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                )}
              </div>
            ) : (
              <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: '1.6', color: '#333', margin: 0 }}>
                  {activeItem?.content || "Nội dung đang được cập nhật..."}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHikorean;
