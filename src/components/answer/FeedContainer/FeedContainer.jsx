import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedContainer.css';
import FeedBox from '../FeedBox/FeedBox';
import iconMessages from '@/assets/icons/icon-messages.svg';
import iconArrowLeft from '@/assets/icons/icon-arrow-left.svg';
import { subjectApi, questionApi } from '@/api';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';

const FeedContainer = ({ mode = 'edit' }) => {
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

        const questionsData = await questionApi.getBySubject(id);
        setQuestions(questionsData?.results || []);
        setQuestionCount(questionsData?.count || 0);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [id]);

  const questionList = questions.map((q) => (
    <FeedBox key={q.id} questionData={q} user={subject} mode={mode} />
  ));

  return (
    <>
      <div className="feed-page-wrapper">
        <div className="back-button">
          <img src={iconArrowLeft} alt="뒤로 가기" className="back-icon" />
          <span>뒤로</span>
        </div>
        <div id="feed-container">
          <div className="feed-header">
            {questions.length === 0 ? (
              <NoQuestion />
            ) : (
              <>
                <img
                  src={iconMessages}
                  alt="messages"
                  className="message-icon"
                />
                <span className="message-text">
                  {`${questionCount}개의 질문이 있습니다`}
                </span>
              </>
            )}
          </div>
          {questionList}
        </div>
      </div>
    </>
  );
};

export default FeedContainer;
