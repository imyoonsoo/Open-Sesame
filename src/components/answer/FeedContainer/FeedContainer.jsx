import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedContainer.css';
import FeedBox from '../FeedBox/FeedBox';
import iconMessages from '@/assets/icons/icon-messages.svg';
import iconArrowLeft from '@/assets/icons/icon-arrow-left.svg';
import { getSubject, getQuestions } from '@/api/openmindApi';

const FeedContainer = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const subjectData = await getSubject(id);
        setSubject(subjectData);

        const questionsData = await getQuestions(id);
        setQuestions(questionsData?.results || []);
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
              {questionCount === 0 ? '아직 질문이 없습니다' : `${questionCount}개의 질문이 있습니다`}
            </span>
        </div>
        {questions.length > 0 ? (
          questions.map((q) => (
            <FeedBox key={q.id} questionData={q} user={subject} />
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