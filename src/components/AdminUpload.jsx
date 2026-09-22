import React, { useState } from 'react';

const AdminUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [scriptText, setScriptText] = useState('');
  const [scriptName, setScriptName] = useState('');
  const [level, setLevel] = useState('TC1');
  const [isParsing, setIsParsing] = useState(false);

  // Fake parsed steps for preview
  const parsedPreview = scriptText.length > 50 ? [
    { role: 'Khách hàng', text: 'Chị ơi lớp của mình sẽ lùi lịch qua 3/4 khai giảng nha bé ơi' },
    { role: 'Tư vấn viên', text: 'Dạ vâng ạ, để em note lại nha.' },
    { role: 'Hệ thống', text: '--- Phân tích tình huống: Khách báo lùi lịch học ---' }
  ] : [];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate file reading
      setIsParsing(true);
      setTimeout(() => {
        setScriptText("... Nội dung kịch bản trích xuất từ file " + e.dataTransfer.files[0].name);
        setIsParsing(false);
      }, 800);
    }
  };

  return (
    <div className="admin-upload-container fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}><i className='bx bx-cloud-upload' style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Upload Kịch Bản Mới</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '4px' }}>Nhập liệu và bóc tách kịch bản chat tự động bằng AI để tạo bài tập Role-play</p>
        </div>
        <button className="btn btn-primary">
          <i className='bx bx-save'></i> Lưu & Xuất bản
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '500px' }}>
        {/* Left Column - Input Form */}
        <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Tên kịch bản thực chiến</label>
              <input 
                type="text" 
                placeholder="VD: Xử lý khách chê học phí cao, khách muốn lùi lịch..." 
                value={scriptName}
                onChange={(e) => setScriptName(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.95rem', fontWeight: 500, outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Trình độ áp dụng</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.95rem', fontWeight: 600, outline: 'none', backgroundColor: 'var(--bg-color)', cursor: 'pointer' }}
                >
                  <option value="SC1">Sơ cấp 1</option>
                  <option value="SC2">Sơ cấp 2</option>
                  <option value="TC1">Trung cấp 1</option>
                  <option value="TC2">Trung cấp 2</option>
                  <option value="TOPIK">Luyện thi TOPIK</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Tag phân loại</label>
                <div style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-color)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--primary-glow)', color: 'var(--primary-hover)', padding: '4px 8px', borderRadius: '4px' }}>Xử lý từ chối</span>
                  <i className='bx bx-plus-circle' style={{ color: 'var(--text-muted)', cursor: 'pointer' }}></i>
                </div>
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Nguồn dữ liệu (Paste Raw Chat hoặc Upload File)</label>
            <div 
              className={`drag-drop-zone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{ 
                border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--border)'}`, 
                borderRadius: '12px', 
                padding: '32px 20px', 
                textAlign: 'center',
                backgroundColor: dragActive ? 'var(--primary-glow)' : 'var(--bg-color)',
                transition: 'all 0.2s',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              <i className='bx bx-file-blank' style={{ fontSize: '3rem', color: dragActive ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '12px' }}></i>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: dragActive ? 'var(--primary)' : 'var(--text-main)' }}>Kéo thả file log chat vào đây</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Hỗ trợ .txt, .pdf, .docx</p>
            </div>

            <textarea 
              placeholder="Hoặc dán trực tiếp đoạn chat Zalo/Pancake vào đây..."
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              style={{ flex: 1, minHeight: '120px', width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.9rem', lineHeight: '1.6', outline: 'none', resize: 'none' }}
            ></textarea>
          </div>
        </div>

        {/* Right Column - AI Preview */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', backgroundColor: '#F8F9FA' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className='bx bx-bot' style={{ color: 'var(--primary)' }}></i> AI Bóc Tách Kịch Bản
            </h3>
            
            {isParsing ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '3rem', marginBottom: '16px' }}></i>
                <p style={{ fontWeight: 700 }}>AI đang phân tích hội thoại...</p>
              </div>
            ) : parsedPreview.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                {parsedPreview.map((step, index) => (
                  <div key={index} style={{ 
                    padding: '16px', 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    borderLeft: step.role === 'Khách hàng' ? '4px solid var(--danger)' : step.role === 'Hệ thống' ? '4px solid var(--text-muted)' : '4px solid var(--primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{step.role}</span>
                    <p style={{ fontSize: '0.95rem', fontWeight: 500, marginTop: '4px' }}>{step.text}</p>
                    
                    {step.role === 'Tư vấn viên' && (
                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success)' }}><i className='bx bx-check-circle'></i> Đáp án đúng</span>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}><i className='bx bx-edit-alt'></i> Thêm phương án nhiễu</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)', borderRadius: '12px', color: 'var(--text-muted)' }}>
                <i className='bx bx-layer' style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.5 }}></i>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Chưa có dữ liệu</p>
                <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Upload hoặc dán kịch bản để xem AI bóc tách</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
