import React, { useState, useEffect } from 'react';
import quizData from '../data/quizData.json';

const AssessmentQuiz = () => {
  const [currentLayer, setCurrentLayer] = useState(1);
  
  // Layer 1 State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  // Layer 2 states
  const [randomQuestionsForL2, setRandomQuestionsForL2] = useState([]);
  const [explanations, setExplanations] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  
  // Layer 3 state
  const [takeaways, setTakeaways] = useState('');

  // Finished state
  const [isFinished, setIsFinished] = useState(false);

  // Generate 10 random questions for Layer 2 when moving to Layer 2
  useEffect(() => {
    if (currentLayer === 2 && randomQuestionsForL2.length === 0) {
      const shuffled = [...quizData].sort(() => 0.5 - Math.random());
      setRandomQuestionsForL2(shuffled.slice(0, 10));
    }
  }, [currentLayer, randomQuestionsForL2.length]);

  const handleOptionSelect = (oIndex) => {
    if (showExplanation) return; // Prevent changing answer after submission
    setSelectedOption(oIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === quizData[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Finished all 100 questions. Check if score is 100/100
      if (score === quizData.length) {
        setCurrentLayer(2);
        window.scrollTo(0, 0);
      } else {
        setErrorMsg(`Bạn chỉ đạt ${score}/${quizData.length} câu. Bạn phải đạt điểm tuyệt đối 100% để qua vòng. Hệ thống sẽ reset bài thi.`);
        // Reset layer 1
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowExplanation(false);
        setScore(0);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleExplanationChange = (questionId, text) => {
    setExplanations(prev => ({ ...prev, [questionId]: text }));
    setErrorMsg('');
  };

  const submitLayer2 = () => {
    const answeredCount = Object.keys(explanations).filter(k => explanations[k].trim().length > 10).length;
    if (answeredCount < 10) {
      setErrorMsg(`Bạn cần giải thích đủ 10 câu (mỗi câu ít nhất 10 ký tự). Hiện tại mới giải thích ${answeredCount}/10 câu.`);
      return;
    }

    // Pass Layer 2
    setErrorMsg('');
    setCurrentLayer(3);
    window.scrollTo(0, 0);
  };

  const submitLayer3 = () => {
    if (takeaways.trim().length < 50) {
      setErrorMsg('Vui lòng tổng kết đủ chi tiết (ít nhất 50 ký tự) để hoàn thành bài test.');
      return;
    }

    // Pass Layer 3
    setErrorMsg('');
    setIsFinished(true);
    
    // Save to real user profile
    const currentId = localStorage.getItem('currentUser');
    if (currentId) {
      const uId = `user_${currentId}`;
      const saved = JSON.parse(localStorage.getItem(uId) || '{}');
      saved.testScore = 100; // Perfect score required to pass layer 3
      localStorage.setItem(uId, JSON.stringify(saved));
    }
    
    window.scrollTo(0, 0);
  };

  if (isFinished) {
    return (
      <div className="card fade-in" style={{ padding: '40px', textAlign: 'center', backgroundColor: '#e8f5e9' }}>
        <i className='bx bxs-check-circle' style={{ fontSize: '5rem', color: '#10b981', marginBottom: '16px' }}></i>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#065f46' }}>CHÚC MỪNG BẠN!</h2>
        <p style={{ fontSize: '1.1rem', marginTop: '16px', color: '#047857', fontWeight: 500 }}>
          Bạn đã xuất sắc vượt qua cả 3 vòng thử thách Hardcore của Kịch bản Chat SW.
          <br/>Kết quả trắc nghiệm và bản báo cáo tự luận của bạn đã được ghi nhận lên hệ thống.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => {
          setIsFinished(false);
          setCurrentLayer(1);
          setCurrentQuestionIndex(0);
          setSelectedOption(null);
          setShowExplanation(false);
          setScore(0);
          setExplanations({});
          setTakeaways('');
        }}>
          Làm bài test khác
        </button>
      </div>
    );
  }

  const currentQ = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #1f2937, #111827)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Bài Kiểm Tra Năng Lực 3 Lớp</h2>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Nội dung: Phân tích Case Study Chat SW - Chốt đơn thành công</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: currentLayer >= 1 ? 'var(--primary)' : '#374151', fontWeight: 800 }}>Lớp 1</div>
          <div style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: currentLayer >= 2 ? 'var(--primary)' : '#374151', fontWeight: 800 }}>Lớp 2</div>
          <div style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: currentLayer >= 3 ? 'var(--primary)' : '#374151', fontWeight: 800 }}>Lớp 3</div>
        </div>
      </div>

      {errorMsg && (
        <div style={{ padding: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className='bx bx-error-circle' style={{ fontSize: '1.2rem' }}></i> {errorMsg}
        </div>
      )}

      {currentLayer === 1 && currentQ && (
        <div className="card fade-in" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
              LỚP 1: TRẮC NGHIỆM ĐIỂM TUYỆT ĐỐI
            </h3>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#6B7280' }}>
              Câu hỏi: <span style={{ color: 'var(--primary)' }}>{currentQuestionIndex + 1}</span> / {quizData.length}
            </div>
          </div>
          
          <div style={{ backgroundColor: '#f9fafb', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px', lineHeight: '1.5' }}>
              {currentQ.question}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentQ.options.map((opt, oIndex) => {
                let bgColor = '#fff';
                let borderColor = '#e5e7eb';
                let icon = '';

                if (showExplanation) {
                  if (oIndex === currentQ.correctAnswer) {
                    bgColor = '#dcfce7'; // green
                    borderColor = '#22c55e';
                    icon = <i className='bx bx-check-circle' style={{ color: '#22c55e', fontSize: '1.2rem' }}></i>;
                  } else if (oIndex === selectedOption) {
                    bgColor = '#fee2e2'; // red
                    borderColor = '#ef4444';
                    icon = <i className='bx bx-x-circle' style={{ color: '#ef4444', fontSize: '1.2rem' }}></i>;
                  }
                } else if (selectedOption === oIndex) {
                  bgColor = 'var(--primary-glow)';
                  borderColor = 'var(--primary)';
                }

                return (
                  <label 
                    key={oIndex} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      cursor: showExplanation ? 'default' : 'pointer', 
                      padding: '16px', 
                      backgroundColor: bgColor, 
                      border: `2px solid ${borderColor}`, 
                      borderRadius: '12px', 
                      transition: 'all 0.2s',
                      opacity: showExplanation && oIndex !== currentQ.correctAnswer && oIndex !== selectedOption ? 0.6 : 1
                    }}
                    onClick={() => handleOptionSelect(oIndex)}
                  >
                    <div style={{ flex: 1, fontSize: '1.05rem', fontWeight: selectedOption === oIndex ? 700 : 500, color: '#1f2937' }}>
                      {opt}
                    </div>
                    {icon}
                  </label>
                );
              })}
            </div>

            {showExplanation && (
              <div className="fade-in" style={{ marginTop: '24px', padding: '20px', backgroundColor: selectedOption === currentQ.correctAnswer ? '#f0fdf4' : '#fef2f2', borderLeft: `4px solid ${selectedOption === currentQ.correctAnswer ? '#22c55e' : '#ef4444'}`, borderRadius: '0 8px 8px 0' }}>
                <h5 style={{ fontWeight: 800, color: selectedOption === currentQ.correctAnswer ? '#166534' : '#991b1b', marginBottom: '8px' }}>
                  {selectedOption === currentQ.correctAnswer ? 'Chính xác! Lập luận chuẩn.' : 'Sai rồi! Đừng buồn, hãy xem giải thích để nhớ lâu hơn.'}
                </h5>
                <p style={{ margin: 0, lineHeight: '1.5', color: '#374151' }}>
                  <strong>Giải thích:</strong> {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            {!showExplanation ? (
              <button 
                className="btn btn-primary" 
                style={{ padding: '14px 32px', fontSize: '1.1rem', fontWeight: 800 }} 
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
              >
                Kiểm tra Đáp án
              </button>
            ) : (
              <button 
                className="btn btn-primary" 
                style={{ padding: '14px 32px', fontSize: '1.1rem', fontWeight: 800 }} 
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < quizData.length - 1 ? 'Tiếp tục câu sau' : 'Hoàn thành Lớp 1'} <i className='bx bx-right-arrow-alt'></i>
              </button>
            )}
          </div>
        </div>
      )}

      {currentLayer === 2 && (
        <div className="card fade-in" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary)', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px' }}>
            LỚP 2: GIẢI THÍCH TÌNH HUỐNG (10 CÂU NGẪU NHIÊN)
          </h3>
          <p style={{ marginBottom: '24px', color: 'var(--text-muted)', fontWeight: 500 }}>
            <i className='bx bx-info-circle'></i> Xin chúc mừng bạn đã vượt qua Lớp 1. Bây giờ, hãy giải thích lý do tại sao bạn lại chọn đáp án đó cho 10 tình huống dưới đây.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {randomQuestionsForL2.map((q, index) => (
              <div key={q.id} style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Câu hỏi: {q.question}</h4>
                <p style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700, marginBottom: '16px', padding: '8px', backgroundColor: '#ecfdf5', borderRadius: '4px' }}>
                  Đáp án bạn đã chọn: {q.options[q.correctAnswer]}
                </p>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Nhập giải thích của bạn vào đây..."
                  value={explanations[q.id] || ''}
                  onChange={(e) => handleExplanationChange(q.id, e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                ></textarea>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }} onClick={submitLayer2}>
              Nộp bài Lớp 2
            </button>
          </div>
        </div>
      )}

      {currentLayer === 3 && (
        <div className="card fade-in" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary)', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px' }}>
            LỚP 3: TỔNG KẾT & RÚT KINH NGHIỆM
          </h3>
          <p style={{ marginBottom: '24px', color: 'var(--text-muted)', fontWeight: 500 }}>
            <i className='bx bx-info-circle'></i> Bước cuối cùng: Hãy liệt kê 10 điểm ấn tượng nhất / bài học cốt lõi bạn rút ra được từ Case Study này.
          </p>

          <textarea 
            className="form-control" 
            rows="10" 
            placeholder="1. Bài học thứ nhất...&#10;2. Bài học thứ hai..."
            value={takeaways}
            onChange={(e) => {
              setTakeaways(e.target.value);
              setErrorMsg('');
            }}
            style={{ width: '100%', resize: 'vertical', fontSize: '1rem', lineHeight: '1.6' }}
          ></textarea>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }} onClick={submitLayer3}>
              Hoàn thành Khóa Đào tạo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentQuiz;
