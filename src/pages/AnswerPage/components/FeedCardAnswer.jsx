import React, { useState } from 'react';
import './FeedCardAnswer.css';
import defaultCatImage from '../../../assets/images/cat.png';
import thumbsUp from '../../../assets/icon/thumbs-up.svg';
import thumbsDown from '../../../assets/icon/thumbs-down.svg';
// import globalcss 나오면 적용~

// api연동 전 단계이므로 목데이터 미리 삽입
const FeedCardAnswer = ({
  question = '좋아하는 동물은 무엇인가유?',
  user = { nickname: '아초는고냥이', profileImage: '' },
  content = '그들을 불러 귀는 이상의 오직 피고, 가슴이 이상, 못할 봄바람이다. 찾아다녀도, 전인 방황하였으며, 대한 바이며, 이것이야말로 가치를 청춘의 따뜻한 그리하였는가? 몸이 열락의 청춘의 때문이다. 천고에 피어나는 간에 밝은 이상, 인생의 만물은 피다. 대중을 이성은 방황하여도, 그리하였는가? 크고 평화스러운 품에 방황하였으며, 말이다. 이상은 들어 예수는 크고 긴지라 역사를 피다. 얼음에 있음으로써 꽃 보배를 곧 가는 교향악이다. 우는 새 예가 우리의 것은 피다. 피가 그것을 어디 앞이 기쁘며, 이상의 열락의 위하여서 끝까지 것이다. 있는 봄바람을 방황하여도, 우리의 것은 작고 아니한 영원히 듣기만 운다.',
  likeCount = 0,
  createdAt = '1주 전',
}) => {
  // 프로필 이미지 대체 고양이 이미지
  const defaultProfile = defaultCatImage;

  // --- 추가된 로직 시작 ---
  const [answerText, setAnswerText] = useState('');
  const [isAnswered, setIsAnswered] = useState(false); // 답변 완료 여부

  const isButtonActive = answerText.trim().length > 0;

  const handleAnswerSubmit = () => {
    if (isButtonActive) {
      console.log('제출된 답변:', answerText);
      setIsAnswered(true); // 제출 시 화면 전환 테스트용
    }
  };

  return (
    <div className="feed-card">
      {/* 최상단: 상태 배지 */}
      <div className="badge-container">
        {isAnswered ? (
          <span className="status-badge">답변 완료</span>
        ) : (
          <span className="status0-badge">미 답변</span>
        )}
      </div>

      {/* 질문 영역 */}
      <div className="question-section">
        <div className="meta-info">질문 · {createdAt}</div>
        <h2 className="question-text">{question}</h2>
      </div>

      {/* 답변 영역 */}
      <div className="answer-section">
        <div className="profile-container">
          <img
            src={user?.profileImage || defaultProfile}
            alt="profile"
            className="profile-img"
          />
        </div>

        <div className="content-container">
          <div className="user-info">
            <span className="nickname">{user?.nickname || '익명'}</span>
            <span className="date">{createdAt}</span>
          </div>

          {/* 답변를 쓸 textarea또는 답변이 들어갈 자리*/}
          {/* <p className="answer-content">{content}</p> */}
          {isAnswered ? (
            <p className="answer-content">{answerText || content}</p>
          ) : (
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
          )}
        </div>
      </div>

      {/* 하단 버튼 영역: 텍스트 기반 버튼 */}
      <div className="footer-section">
        <button className="btn-action btn-like">
          <img src={thumbsUp} alt="좋아요" className="btn-icon" />
          좋아요 {likeCount > 0 ? likeCount : ''}
        </button>
        <button className="btn-action btn-dislike">
          <img src={thumbsDown} alt="싫어요" className="btn-icon" />
          싫어요
        </button>
      </div>
    </div>
  );
};

export default FeedCardAnswer;
