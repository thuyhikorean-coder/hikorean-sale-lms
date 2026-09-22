import React, { useState, useEffect } from 'react';
import './index.css';
import RolePlayQuiz from './components/RolePlayQuiz';
import AdminUpload from './components/AdminUpload';
import LearningPath from './components/LearningPath';
import WikiSearch from './components/WikiSearch';
import SaleToolkits from './components/SaleToolkits';
import AboutHikorean from './components/AboutHikorean';
import AssessmentQuiz from './components/AssessmentQuiz';
import Login from './components/Login';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    totalTimeMs: 0,
    testsCompleted: 0,
    testScore: 0,
    roleplayScore: 0
  });

  // Calculate active time
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      const uId = `user_${user.phone}`;
      const saved = JSON.parse(localStorage.getItem(uId) || '{}');
      const newTotal = (saved.totalTimeMs || 0) + 1000;
      saved.totalTimeMs = newTotal;
      localStorage.setItem(uId, JSON.stringify(saved));
      setUserData(saved);
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const currentId = localStorage.getItem('currentUser');
    if (currentId) {
      const saved = JSON.parse(localStorage.getItem(`user_${currentId}`) || '{}');
      if (saved.name) {
        setUser(saved);
        setUserData(saved);
      }
    }
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    const saved = JSON.parse(localStorage.getItem(`user_${u.phone}`) || '{}');
    setUserData(saved);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const sendReportToGoogleSheet = async () => {
    // This URL will be replaced by the user's Google Apps Script URL
    const scriptUrl = localStorage.getItem('gas_url') || '';
    if (!scriptUrl) {
      const inputUrl = prompt("Nhập link Google Apps Script Web App (Webhook) của file Google Sheet để gửi báo cáo:");
      if (!inputUrl) return;
      localStorage.setItem('gas_url', inputUrl);
      return sendReportToGoogleSheet(); // retry
    }

    try {
      alert("Đang gửi báo cáo lên Google Sheet...");
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          phone: user.phone,
          loginTime: user.loginTime,
          activeTime: formatTime(userData.totalTimeMs || 0),
          testScore: userData.testScore || 0,
          roleplayScore: userData.roleplayScore || 0,
          reportDate: new Date().toISOString()
        })
      });
      alert("Đã gửi Báo cáo năng lực thành công!");
    } catch (e) {
      alert("Có lỗi xảy ra khi gửi báo cáo: " + e.message);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container d-flex" style={{ minHeight: '100vh', backgroundColor: '#F0F2F5' }}>
      {/* Sidebar */}
      <aside className="sidebar flex-column" style={{ width: '280px', padding: '24px 16px', background: 'var(--bg-color)', borderRight: '1px solid var(--border)' }}>
        <div className="brand" style={{ marginBottom: '32px', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.4rem', boxShadow: '0 4px 10px var(--primary-glow)' }}>
              <i className='bx bxs-graduation'></i>
            </div>
            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.5px', margin: 0 }}>HIKOREAN SALE</h1>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginTop: '2px' }}>TRAINING PORTAL</p>
            </div>
          </div>
        </div>

        <nav className="nav-menu d-flex flex-column gap-2" style={{ flex: 1 }}>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <i className='bx bxs-dashboard'></i> Tổng quan
          </div>
          <div className={`nav-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
            <i className='bx bx-buildings'></i> Giới thiệu Hi Korean
          </div>
          <div className={`nav-item ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => setActiveTab('learning')}>
            <i className='bx bxs-book-open'></i> Lộ trình học
          </div>
          <div className={`nav-item ${activeTab === 'test' ? 'active' : ''}`} onClick={() => setActiveTab('test')} style={{ borderLeft: '3px solid #ef4444', backgroundColor: activeTab === 'test' ? 'rgba(239, 68, 68, 0.1)' : 'transparent' }}>
            <i className='bx bx-task' style={{ color: '#ef4444' }}></i> Bài Kiểm Tra
          </div>
          <div className={`nav-item ${activeTab === 'roleplay' ? 'active' : ''}`} onClick={() => setActiveTab('roleplay')}>
            <i className='bx bx-video-recording'></i> Thực chiến Role-play
          </div>
          <div className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>
            <i className='bx bx-cloud-upload'></i> Upload Kịch bản
          </div>
          <div className={`nav-item ${activeTab === 'toolkits' ? 'active' : ''}`} onClick={() => setActiveTab('toolkits')}>
            <i className='bx bx-photo-album'></i> Kho Tài nguyên
          </div>
          <div className={`nav-item ${activeTab === 'wiki' ? 'active' : ''}`} onClick={() => setActiveTab('wiki')}>
            <i className='bx bx-search-alt'></i> Tra cứu nhanh
          </div>
        </nav>

        <div className="user-profile card" style={{ padding: '16px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--text-main)', fontSize: '1.2rem' }}>
              <i className='bx bx-user'></i>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{user.name}</h4>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{user.phone}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn" style={{ padding: '8px', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            <i className='bx bx-log-out' style={{ margin: 0 }}></i>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content flex-column" style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* Header Section (like DASHBOARD.HIKOREAN.VN) */}
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div className="header-left">
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.5px' }}>DASHBOARD ĐÀO TẠO</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><i className='bx bx-check-circle'></i> Version 1.0</span>
              <span style={{ color: 'rgba(0,0,0,0.1)' }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><i className='bx bxs-calendar-event'></i> Tháng 06/2026</span>
            </div>
          </div>

          <div className="header-right" style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
            <button className="btn btn-outline" style={{ height: '100%', borderColor: 'var(--success)', color: 'var(--success)' }} onClick={sendReportToGoogleSheet}>
              <i className='bx bx-spreadsheet'></i> Nộp Báo Cáo
            </button>

            <div className="stat-box" style={{ borderColor: 'var(--primary)', boxShadow: '0 4px 15px var(--primary-glow)' }}>
              <span className="stat-box-title">ĐIỂM AI ROLEPLAY</span>
              <span className="stat-box-value" style={{ color: 'var(--primary)' }}>{userData.roleplayScore || 0}</span>
            </div>

            <div className="stat-box">
              <span className="stat-box-title">THỜI GIAN HỌC</span>
              <span className="stat-box-value">{formatTime(userData.totalTimeMs || 0)}</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
                <p className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Trạng thái Bài Kiểm Tra</p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '8px 0', color: userData.testScore >= 50 ? 'var(--success)' : 'var(--danger)' }}>
                  {userData.testScore >= 50 ? 'ĐÃ VƯỢT QUA' : 'CHƯA HOÀN THÀNH'}
                </h2>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: userData.testScore >= 50 ? '100%' : '20%', height: '100%', background: userData.testScore >= 50 ? 'var(--success)' : 'var(--danger)' }}></div>
                </div>
              </div>

              <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
                <p className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Điểm AI Role-Play Tích lũy</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '8px 0', color: 'var(--success)' }}>{userData.roleplayScore || 0}</h2>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)' }}><i className='bx bx-trending-up'></i> Liên tục cập nhật</p>
              </div>

              <div className="card" style={{ borderTop: '4px solid var(--warning)' }}>
                <p className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Thời gian Online Thực tế</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '8px 0', color: '#B8962A' }}>{formatTime(userData.totalTimeMs || 0)}</h2>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Đo lường độ chăm chỉ</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Nhiệm vụ tiếp theo</h3>
            <div className="d-flex flex-column gap-3">
              <div className="card d-flex justify-between items-center" style={{ padding: '16px 24px' }}>
                <div className="d-flex items-center gap-4">
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    <i className='bx bx-book-open'></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Học bài: Kịch bản tư vấn lộ trình Topik 4</h4>
                    <p className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500, marginTop: '4px' }}>Video 15 phút • Cần hoàn thành hôm nay</p>
                  </div>
                </div>
                <button className="btn btn-primary">Học ngay <i className='bx bx-right-arrow-alt'></i></button>
              </div>

              <div className="card d-flex justify-between items-center" style={{ padding: '16px 24px' }}>
                <div className="d-flex items-center gap-4">
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--danger-glow)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    <i className='bx bx-message-dots'></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Thực chiến: Khách kêu học phí đắt</h4>
                    <p className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500, marginTop: '4px' }}>Bài test giả lập chat • 5 câu hỏi</p>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Bắt đầu Role-play</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <LearningPath />
        )}

        {activeTab === 'about' && (
          <AboutHikorean />
        )}

        {activeTab === 'roleplay' && (
          <RolePlayQuiz />
        )}

        {activeTab === 'test' && (
          <AssessmentQuiz />
        )}

        {activeTab === 'upload' && (
          <AdminUpload />
        )}

        {activeTab === 'wiki' && (
          <WikiSearch />
        )}

        {activeTab === 'toolkits' && (
          <SaleToolkits />
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'dashboard' && activeTab !== 'about' && activeTab !== 'learning' && activeTab !== 'test' && activeTab !== 'roleplay' && activeTab !== 'upload' && activeTab !== 'wiki' && activeTab !== 'toolkits' && (
          <div className="card d-flex flex-column items-center justify-center" style={{ minHeight: '400px', textAlign: 'center' }}>
            <i className='bx bx-cog bx-spin' style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '16px' }}></i>
            <h3 style={{ fontWeight: 800 }}>Tính năng đang phát triển</h3>
            <p className="text-muted" style={{ marginTop: '8px', fontWeight: 500 }}>Chức năng "{activeTab}" sẽ sớm được ra mắt trong Phase tiếp theo.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
