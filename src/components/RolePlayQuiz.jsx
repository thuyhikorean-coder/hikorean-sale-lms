import React, { useState, useEffect, useRef } from 'react';
import scenariosData from '../data/roleplayScenarios.json';

const getSystemInstruction = (scenario) => `Bạn đóng 2 vai trò đồng thời trong phiên huấn luyện tư vấn bán khóa học tiếng Hàn:
1. Vai Khách hàng (${scenario.studentName}): Bạn là khách hàng đang gặp tình huống sau: "${scenario.description}". Hãy trò chuyện tự nhiên, ngắn gọn như đang chat Zalo. Cố gắng làm khó Sale theo đúng tâm lý của tình huống này.
2. Vai Giám khảo (Evaluator): Bạn là một quản lý Sale đang giám sát. Bạn dựa vào HIKOREAN KỊCH BẢN và LỘ TRÌNH KHÓA HỌC để đánh giá câu trả lời của nhân viên Sale.
Quy tắc kịch bản chung:
- Sale phải khai thác nhu cầu trước khi báo giá.
- Nếu khách gặp khó khăn, Sale phải đồng cảm, đưa ra giải pháp (ví dụ: đổi lịch, bảo lưu, trả góp) thay vì bỏ cuộc.
- Nếu Sale trả lời sai quy trình, báo giá quá sớm, thái độ không tốt hoặc dễ dàng bỏ cuộc, hãy trừ điểm. Nếu xử lý khéo léo, hãy cộng điểm.

BẠN BẮT BUỘC PHẢI TRẢ LỜI THEO ĐÚNG ĐỊNH DẠNG JSON SAU (không chứa markdown markdown block \`\`\`json, chỉ trả về chuỗi JSON hợp lệ):
{
  "customer_reply": "Câu trả lời của khách hàng gửi cho Sale",
  "evaluation": "Nhận xét của quản lý về câu trả lời của Sale (chỉ ra chỗ tốt/chỗ sai theo kịch bản)",
  "score_change": <số nguyên từ -5 đến 10. Ví dụ: 5 nếu trả lời tốt, -3 nếu vi phạm kịch bản>
}
`;

export default function RolePlayQuiz() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [score, setScore] = useState(0);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, selectedScenario]);

  // Load Score
  useEffect(() => {
    const currentId = localStorage.getItem('currentUser');
    if (currentId) {
      const uId = `user_${currentId}`;
      const saved = JSON.parse(localStorage.getItem(uId) || '{}');
      if (saved.roleplayScore) setScore(saved.roleplayScore);
    }
  }, []);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowSettings(false);
  };

  const startScenario = (scenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        sender: 'system',
        message: `Tình huống: ${scenario.description}`,
        type: 'alert'
      },
      {
        sender: 'customer',
        message: scenario.initialMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const backToList = () => {
    setSelectedScenario(null);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    if (!apiKey) {
      alert("Vui lòng thiết lập Gemini API Key trong phần Cài đặt (góc trên bên phải) để kích hoạt Trợ lý AI.");
      setShowSettings(true);
      return;
    }

    const newUserMsg = {
      sender: 'sale',
      message: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build conversation history for the AI
      const historyText = messages.filter(m => m.sender === 'sale' || m.sender === 'customer').map(m => {
        return `${m.sender === 'sale' ? 'Sale' : 'Customer'}: ${m.message}`;
      }).join('\n');
      
      const currentPrompt = `${historyText}\nSale: ${newUserMsg.message}\n\nHãy phản hồi bằng JSON.`;
      const sysInstruction = getSystemInstruction(selectedScenario);

      const modelsToTry = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      let response;
      let errData;
      let success = false;
      let errorLog = [];

      for (const model of modelsToTry) {
        let retries = 2;
        while (retries > 0) {
          try {
            response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{ text: sysInstruction + "\n\n" + currentPrompt }]
                }],
                generationConfig: {
                  temperature: 0.7
                }
              })
            });
            
            if (response.ok) {
              success = true;
              break;
            } else {
              errData = await response.json();
              errorLog.push(`${model}: ${errData.error?.message || 'Unknown error'}`);
              break; 
            }
          } catch (e) {
            retries--;
            if (retries === 0) {
              errorLog.push(`${model} (Net): ${e.message}`);
              break;
            }
            await new Promise(r => setTimeout(r, 1000));
          }
        }
        if (success) break;
      }

      if (!success) {
        throw new Error("Chi tiết lỗi: " + errorLog.join(" | "));
      }

      const data = await response.json();
      const aiResponseText = data.candidates[0].content.parts[0].text;
      
      let aiResult;
      try {
        aiResult = JSON.parse(aiResponseText);
      } catch (e) {
        // Fallback cleanup if AI returns markdown wrapper
        const cleanJson = aiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
        aiResult = JSON.parse(cleanJson);
      }

      // Update Score in local state
      const newScore = score + (aiResult.score_change || 0);
      setScore(newScore);
      
      // Update Real User Profile
      const currentId = localStorage.getItem('currentUser');
      if (currentId) {
        const uId = `user_${currentId}`;
        const saved = JSON.parse(localStorage.getItem(uId) || '{}');
        saved.roleplayScore = newScore;
        localStorage.setItem(uId, JSON.stringify(saved));
      }

      // Add Evaluation Message
      setMessages(prev => [...prev, {
        sender: 'system',
        message: `${aiResult.score_change >= 0 ? '✅' : '❌'} Đánh giá từ Quản lý AI (${aiResult.score_change > 0 ? '+' : ''}${aiResult.score_change} điểm): ${aiResult.evaluation}`,
        type: aiResult.score_change >= 0 ? 'feedback-success' : 'feedback-error'
      }]);

      // Add Customer Message
      setMessages(prev => [...prev, {
        sender: 'customer',
        message: aiResult.customer_reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        sender: 'system',
        message: `Lỗi kết nối: ${error.message}. Chú ý: API Key chuẩn thường bắt đầu bằng "AQ." hoặc "AIzaSy..."`,
        type: 'feedback-error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="roleplay-container d-flex flex-column gap-3" style={{ height: 'calc(100vh - 120px)', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header & Score */}
      <div className="card d-flex justify-content-between align-items-center" style={{ padding: '16px 24px', background: 'linear-gradient(135deg, #1f2937, #111827)', color: '#fff' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>
            {selectedScenario ? (
              <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={backToList}>
                <i className='bx bx-arrow-back'></i> Quay lại ngân hàng
              </span>
            ) : (
              'Ngân Hàng Role-Play (20 Tình Huống)'
            )}
          </h2>
          <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>
            {selectedScenario ? `Đang thực chiến với: ${selectedScenario.studentName}` : 'Chọn 1 tình huống bất kỳ để rèn luyện kỹ năng xử lý từ chối'}
          </p>
        </div>
        <div className="d-flex align-items-center gap-4">
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Tổng Điểm Kỹ Năng</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: score >= 0 ? '#10b981' : '#ef4444' }}>
              {score > 0 ? '+' : ''}{score}
            </div>
          </div>
          <button onClick={() => setShowSettings(true)} className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none' }}>
            <i className='bx bx-cog'></i> Cài đặt AI
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="card" style={{ width: '400px', padding: '32px' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '16px' }}><i className='bx bx-brain'></i> Cấu hình Trợ lý AI</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Nhập Google Gemini API Key để kích hoạt não bộ cho AI.</p>
            <input 
              type="password" 
              className="form-control" 
              placeholder="AQ. hoặc AIzaSy..." 
              defaultValue={apiKey}
              id="apiKeyInput"
              style={{ marginBottom: '24px' }}
            />
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline" onClick={() => setShowSettings(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => saveApiKey(document.getElementById('apiKeyInput').value)}>Lưu & Kích hoạt</button>
            </div>
          </div>
        </div>
      )}

      {/* View Logic */}
      {!selectedScenario ? (
        // LIST VIEW
        <div className="card" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <div className="row g-4">
            {scenariosData.map(scenario => (
              <div key={scenario.id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="card scenario-card h-100" 
                  onClick={() => startScenario(scenario)}
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'all 0.2s', 
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    padding: '20px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {scenario.category}
                    </span>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>#{scenario.id}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{scenario.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    <strong>{scenario.studentName}:</strong> {scenario.description}
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    <button className="btn btn-primary w-100" style={{ fontSize: '0.9rem' }}>Vào Thực Chiến</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // CHAT VIEW
        <div className="chat-box card flex-column" style={{ flex: 1, display: 'flex', padding: 0, overflow: 'hidden' }}>
          <div className="chat-body" style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#F0F2F5', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.sender === 'sale' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                width: msg.sender === 'system' ? '100%' : 'auto'
              }}>
                {msg.type === 'alert' && (
                  <div style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#B8962A', padding: '12px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', margin: '10px 0', border: '1px solid var(--primary)' }}>
                    ⚠️ {msg.message}
                  </div>
                )}
                {msg.type === 'feedback-success' && (
                  <div style={{ background: 'rgba(46, 125, 50, 0.1)', color: 'var(--success)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, margin: '8px 0', borderLeft: '4px solid var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {msg.message}
                  </div>
                )}
                {msg.type === 'feedback-error' && (
                  <div style={{ background: 'rgba(211, 47, 47, 0.1)', color: 'var(--danger)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, margin: '8px 0', borderLeft: '4px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {msg.message}
                  </div>
                )}
                {msg.sender === 'customer' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '0.95rem', color: '#1A1A1A', lineHeight: '1.5' }}>
                      {msg.message}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px', marginLeft: '4px' }}>{selectedScenario.studentName} (Khách hàng) • {msg.time}</span>
                  </div>
                )}
                {msg.sender === 'sale' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ background: 'var(--primary)', color: '#fff', padding: '12px 16px', borderRadius: '16px', borderTopRightRadius: '4px', boxShadow: '0 2px 5px var(--primary-glow)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {msg.message}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px', marginRight: '4px' }}>Bạn (Tư vấn viên) • {msg.time}</span>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>AI đang đánh giá & phản hồi...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <textarea 
              className="form-control" 
              placeholder="Gõ nội dung tư vấn của bạn vào đây (Nhấn Enter để gửi, Shift+Enter để xuống dòng)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              style={{ flex: 1, resize: 'none', height: '60px', borderRadius: '24px', padding: '16px 20px', lineHeight: '1.4' }}
            />
            <button 
              className="btn btn-primary" 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              style={{ height: '60px', width: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
            >
              <i className='bx bx-send' style={{ fontSize: '1.5rem', marginLeft: '4px' }}></i>
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        .typing-indicator span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #9CA3AF;
          border-radius: 50%;
          margin: 0 2px;
          animation: typing 1.4s infinite both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: 0s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .scenario-card:hover {
          border-color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
}
