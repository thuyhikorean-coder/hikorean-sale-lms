import React, { useState } from 'react';
import wikiData from '../data/wikiData.json';

const WikiSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [expandedId, setExpandedId] = useState(null);

  const filters = ['Tất cả', 'Quy trình Sale', 'Chính sách', 'Khóa học', 'Xử lý từ chối', 'Kiến thức chuyên môn', 'Bài viết Cuộc sống', 'Nội dung Marketing'];

  const filteredData = wikiData.filter(item => {
    const matchesFilter = activeFilter === 'Tất cả' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="wiki-container fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Search Bar */}
      <div className="card" style={{ padding: '32px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', color: '#fff' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px' }}>Tra Cứu Nhanh (Wiki)</h2>
        <p style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '24px', opacity: 0.9 }}>
          Tìm kiếm thông tin khóa học, chính sách trung tâm, và kịch bản xử lý từ chối trong tích tắc.
        </p>

        <div style={{ position: 'relative', maxWidth: '800px' }}>
          <i className='bx bx-search' style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#888' }}></i>
          <input 
            type="text" 
            placeholder="Nhập từ khóa (VD: bảo lưu, học phí TC1, tóp 4...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '16px 20px 16px 56px', borderRadius: '12px', border: 'none', fontSize: '1.05rem', fontWeight: 600, outline: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
          />
        </div>
      </div>

      {/* Main Content: Filters & Results */}
      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '400px' }}>
        
        {/* Sidebar Filters */}
        <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Danh mục</h4>
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{ 
                textAlign: 'left', 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: 'none', 
                backgroundColor: activeFilter === filter ? 'var(--primary-glow)' : 'transparent',
                color: activeFilter === filter ? 'var(--primary-hover)' : 'var(--text-main)',
                fontWeight: activeFilter === filter ? 800 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <div 
                key={item.id} 
                className="card" 
                style={{ cursor: 'pointer', borderLeft: '4px solid var(--primary)', padding: '20px' }}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.category}</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-main)' }}>{item.title}</h3>
                  </div>
                  <i className={`bx ${expandedId === item.id ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}></i>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  {item.tags.map((tag, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', backgroundColor: '#F0F2F5', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '100px', fontWeight: 600 }}>#{tag}</span>
                  ))}
                </div>

                {/* Expanded Content */}
                {expandedId === item.id ? (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed var(--border)', fontSize: '0.95rem', lineHeight: '1.6', color: '#333' }}>
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, maxHeight: '400px', overflowY: 'auto', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      {item.content}
                    </pre>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><i className='bx bx-copy'></i> Copy nội dung</button>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><i className='bx bx-share-alt'></i> Chia sẻ</button>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <i className='bx bx-link-external'></i> Mở trên Notion
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {item.excerpt}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <i className='bx bx-search-alt' style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.5 }}></i>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)' }}>Không tìm thấy kết quả</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Thử tìm bằng một từ khóa khác hoặc bỏ chọn danh mục.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WikiSearch;
