import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedContainer.css';
import FeedBox from '../FeedBox/FeedBox';
import iconMessages from '@/assets/icons/icon-messages.svg';
import iconArrowLeft from '@/assets/icons/icon-arrow-left.svg';
import { subjectApi, questionApi } from '@/api';

const FeedContainer = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const subjectData = await subjectApi.getById(id);
        setSubject(subjectData);

        const questionsData = await questionApi.getBySubject(id, { limit: 100 });
        
        // 작성 시간 기준 오름차순 (오래된 글이 위로, 최신 글이 아래로) 정렬
        const sortedQuestions = (questionsData?.results || []).sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        
        setQuestions(sortedQuestions);
        setQuestionCount(questionsData?.count || 0);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="feed-page-wrapper">
        <div className="back-button">
          <img src={iconArrowLeft} alt="뒤로 가기" className="back-icon" />
          <span>뒤로</span>
        </div>
        <div id="feed-container">
          <div className="feed-header">
            <img src={iconMessages} alt="messages" className="message-icon" />
            <span className="message-text">
              {questionCount === 0
                ? '아직 질문이 없습니다'
                : `${questionCount}개의 질문이 있습니다`}
            </span>
        </div>
        {questions.length > 0 ? (
          questions.map((q) => (
            <FeedBox
              key={q.id}
              questionData={q}
              user={subject}
              onDeleteSuccess={(deletedQuestionId) => {
                if (!deletedQuestionId) return;

                setQuestions((prev) =>
                  prev.filter((item) => item.id !== deletedQuestionId)
                );

                setQuestionCount((prev) => Math.max(prev - 1, 0));
              }}
            />
          ))
        ) : (
          <div className="empty-message-container">
            {/* Optional empty state UI */}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default FeedContainer;
