import React, { useState, useEffect } from 'react';
import './FeedBox.css';
import defaultCatImage from '@/assets/images/img-profile-cat.png';
import iconGoodSesame from '@/assets/icons/icon-good-sesame.svg';
import iconArrowDown from '@/assets/icons/icon-arrow-down.svg';
import iconArrowUp from '@/assets/icons/icon-arrow-up.svg';
import { answerApi } from '@/api';
import EditDropdown from '@/components/answer/EditDropdown/EditDropdown';

const FeedBox = ({ questionData, user }) => {
  const {
    id: questionId,
    content: questionContent = '질문 내용이 없습니다.',
    likeCount = 0,
    createdAt = '',
    answer = null,
  } = questionData || {};

  const defaultProfile = defaultCatImage;

  // --- 상태 관리 ---
  const [answerText, setAnswerText] = useState(answer?.content || '');
  const [isAnswered, setIsAnswered] = useState(answer !== null); // answer 객체 있는지 여부
  const [isRejected, setIsRejected] = useState(answer?.isRejected || false);
  const [isReplying, setIsReplying] = useState(false); // 답변하기 텍스트창 열림 여부
  const [localName, setLocalName] = useState('');

  const isButtonActive = answerText.trim().length > 0;

  useEffect(() => {
    // localStorage에 저장된 username 가져오기 (문자열에 포함된 따옴표 제거 가능성 대비)
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setLocalName(storedName.replace(/['"]/g, ''));
    }
  }, []);

  const handleAnswerSubmit = async () => {
    if (isButtonActive && !isAnswered) {
      if (!questionId) return;
      // 답변등록 관련 오류 처리
      try {
        const result = await answerApi.create(questionId, {
          content: answerText,
          isRejected: false,
        });
        setIsAnswered(true);
        setIsReplying(false); // 제출 후 텍스트 영역 닫기
      } catch (error) {
        console.error('답변 등록 실패:', error);
        alert('답변을 등록하는 중 문제가 발생했습니다.');
      }
    }
  };

  const handleToggleReply = () => {
    setIsReplying(!isReplying);
  };

  // 날짜 포맷 (예: 2023-11-01T02:24:43Z -> 2023.11.01)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const formattedDate = formatDate(createdAt);
  const answerFormattedDate = formatDate(answer?.createdAt);

  const subjectName = user?.name || user?.nickname || '익명';
  const isMySubject = localName === subjectName; // 내 대상(Subject) 판단 조건

  return (
    <div className="feed-box">
      {/* 최상단: 상태 배지 */}
      <div className="badge-container">
  {isAnswered ? (
    <span className="status-badge">답변 완료</span>
  ) : (
    <span className="status0-badge">미답변</span>
  )}

  {isAnswered && (
    <EditDropdown
      onEdit={() => {
        setIsReplying(true);
      }}
      onDelete={() => {
        alert('삭제 기능 연결 예정');
      }}
    />
  )}
</div>

      {/* 질문 영역 */}
      <div className="question-section">
        <div className="meta-info">질문 · {formattedDate}</div>
        <h2 className="question-text">{questionContent}</h2>
      </div>

      {/* 답변 영역: 이미 답변이 있거나, 내 질문 대상일 때만 렌더링 */}
      {(isAnswered || isMySubject) && (
        <div className="answer-section">
          <div className="profile-container">
            <img
              src={user?.imageSource || user?.profileImage || defaultProfile}
              alt="profile"
              className="profile-img"
            />
          </div>

          <div className="content-container">
            <div className="user-info">
              <span className="nickname">{subjectName}</span>
              <span className="date">
                {isAnswered ? answerFormattedDate : formattedDate}
              </span>

              {/* [답변하기] 토글: 아직 답변이 안달렸고 현재 사용자의 Subject일 때만 표시 */}
              {!isAnswered && isMySubject && (
                <button
                  className="btn-reply-toggle"
                  onClick={handleToggleReply}
                >
                  {isReplying ? '닫기' : '답변하기'}
                  <img
                    src={isReplying ? iconArrowUp : iconArrowDown}
                    alt="토글 아이콘"
                    className="reply-toggle-icon"
                  />
                </button>
              )}
            </div>

            {isAnswered ? (
              <p className="answer-content">
                {isRejected ? (
                  <span className="rejected-text">답변 거절</span>
                ) : (
                  answerText
                )}
              </p>
            ) : isMySubject ? ( // isReplying 토글에 맞춰 CSS transition 적용
              <div
                className={`answer-input-container ${isReplying ? 'open' : ''}`}
              >
                <div className="answer-input-wrapper">
                  <textarea
                    className="answer-textarea"
                    placeholder="답변을 입력해주세요"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                  />
                  <button
                    className={`btn-submit ${isButtonActive ? 'active' : 'disabled'}`}
                    disabled={!isButtonActive}
                    onClick={handleAnswerSubmit}
                  >
                    답변 완료
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* 하단 버튼 영역 */}
      <div className="footer-section">
        <button className="btn-action btn-sesame">
          <img src={iconGoodSesame} alt="참깨 아이콘" className="icon-sesame" />
          참깨 {likeCount} 방울
        </button>
      </div>
    </div>
  );
};

export default FeedBox;
