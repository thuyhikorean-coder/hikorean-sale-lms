import React, { useState } from 'react';
import mediaData from '../data/mediaData.json';

const SaleToolkits = () => {
  const [activeCategory, setActiveCategory] = useState('zalo_feedback');

  const categories = [
    { id: 'zalo_feedback', title: 'Feedback Zalo Học viên', icon: 'bx-message-rounded-dots' },
    { id: 'topik_feedback', title: 'Kết quả thi TOPIK', icon: 'bx-medal' },
    { id: 'facility', title: 'Cơ sở vật chất', icon: 'bx-building-house' }
  ];

  const getImages = () => {
    return mediaData[activeCategory] || [];
  };

  const images = getImages();

  return (
    <div className="toolkits-container fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="card" style={{ padding: '32px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', color: '#fff' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px' }}>Kho Tài nguyên chốt Sale (Sale Toolkits)</h2>
        <p style={{ fontSize: '0.95rem', fontWeight: 500, opacity: 0.9 }}>
          Thư viện hình ảnh Feedback chất lượng, bảng điểm TOPIK và hình ảnh cơ sở vật chất sắc nét nhất để gửi cho khách hàng.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '500px' }}>
        {/* Sidebar Filters */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Danh mục Media</h4>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{ 
                textAlign: 'left', 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: 'none', 
                backgroundColor: activeCategory === cat.id ? 'var(--primary-glow)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--primary-hover)' : 'var(--text-main)',
                fontWeight: activeCategory === cat.id ? 800 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className={`bx ${cat.icon}`} style={{ fontSize: '1.2rem' }}></i> {cat.title}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{categories.find(c => c.id === activeCategory)?.title}</h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>{images.length} hình ảnh</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', overflowY: 'auto' }}>
            {images.map((imgName, idx) => (
              <div key={idx} style={{ 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid var(--border)',
                aspectRatio: activeCategory === 'facility' ? '4/3' : '3/4',
                position: 'relative',
                cursor: 'pointer',
                group: 'true'
              }}
              className="media-item"
              >
                <img 
                  src={`/assets/images/${activeCategory}/${imgName}`} 
                  alt={imgName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  className: 'hover-overlay'
                }}>
                  <a href={`/assets/images/${activeCategory}/${imgName}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <i className='bx bx-zoom-in'></i> Phóng to
                  </a>
                </div>
              </div>
            ))}
            
            {images.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <i className='bx bx-images' style={{ fontSize: '3rem', marginBottom: '12px', opacity: 0.5 }}></i>
                <p>Chưa có hình ảnh nào trong mục này</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add a tiny style block to handle hover effects since we are not putting this in index.css */}
      <style>{`
        .media-item:hover img {
          transform: scale(1.05);
        }
        .media-item:hover div {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default SaleToolkits;
