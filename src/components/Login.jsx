import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Vui lòng nhập Họ và Tên hợp lệ.');
      return;
    }
    if (phone.trim().length < 9) {
      setError('Vui lòng nhập Số điện thoại hợp lệ.');
      return;
    }

    const userData = {
      name: name.trim(),
      phone: phone.trim(),
      loginTime: new Date().toISOString()
    };
    
    // Check if user already exists in local storage to preserve data
    const existingData = localStorage.getItem(`user_${phone.trim()}`);
    if (!existingData) {
      localStorage.setItem(`user_${phone.trim()}`, JSON.stringify({
        ...userData,
        totalTimeMs: 0,
        testsCompleted: 0,
        testScore: 0,
        roleplayScore: 0
      }));
    } else {
      // Just update login time
      const parsed = JSON.parse(existingData);
      parsed.loginTime = userData.loginTime;
      localStorage.setItem(`user_${phone.trim()}`, JSON.stringify(parsed));
    }
    
    // Set current active user
    localStorage.setItem('currentUser', phone.trim());
    onLogin(userData);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', margin: '0 auto 24px', boxShadow: '0 10px 25px var(--primary-glow)' }}>
            <i className='bx bxs-graduation'></i>
          </div>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px' }}>HIKOREAN SALE</h1>
          <p style={{ color: '#9CA3AF', fontSize: '1.2rem', fontWeight: 500, marginTop: '8px' }}>Hệ thống Huấn luyện & Đánh giá Năng lực</p>
        </div>

        <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '40px', borderRadius: '24px', background: '#fff' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center', color: '#111827' }}>
            ĐĂNG NHẬP VÀO LỚP HỌC
          </h2>
          
          {error && (
            <div style={{ background: '#fee2e2', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
              <i className='bx bx-error-circle'></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px', color: '#374151' }}>Họ và Tên của bạn</label>
              <div style={{ position: 'relative' }}>
                <i className='bx bx-user' style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: '1.2rem' }}></i>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={name}
                  onChange={(e) => {setName(e.target.value); setError('');}}
                  style={{ paddingLeft: '48px', height: '52px', fontSize: '1rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px', color: '#374151' }}>Số điện thoại (Dùng làm ID)</label>
              <div style={{ position: 'relative' }}>
                <i className='bx bx-phone' style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: '1.2rem' }}></i>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="Ví dụ: 0987654321"
                  value={phone}
                  onChange={(e) => {setPhone(e.target.value.replace(/\D/g, '')); setError('');}}
                  style={{ paddingLeft: '48px', height: '52px', fontSize: '1rem' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ height: '52px', fontSize: '1.1rem', fontWeight: 800, marginTop: '8px' }}>
              Bắt đầu học <i className='bx bx-right-arrow-alt'></i>
            </button>
          </form>
          
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#6B7280' }}>
            Toàn bộ tiến độ học tập và điểm số của bạn sẽ được lưu lại theo Số điện thoại này để Quản lý đánh giá.
          </div>
        </div>
      </div>
    </div>
  );
}
