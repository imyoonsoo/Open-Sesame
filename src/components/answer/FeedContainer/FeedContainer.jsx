import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './FeedContainer.css';
import FeedBox from '../FeedBox/FeedBox';
import iconMessages from '@/assets/icons/icon-messages.svg';
import iconArrowLeft from '@/assets/icons/icon-arrow-left.svg';
import { subjectApi, questionApi } from '@/api';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import DeleteCompleteModal from '@/components/common/DeleteCompleteModal/DeleteCompleteModal';

const FeedContainer = ({ mode = 'edit' }) => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [haveMoreQuestions, setHaveMoreQuestions] = useState(false);
  const [pagingByOffset, setPagingByOffset] = useState(0);
  const [loadingMoreQuestions, SetLoadingMoreQuestions] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [isDeleteCompleteOpen, setIsDeleteCompleteOpen] = useState(false);
  const [deleteCompleteMessage, setDeleteCompleteMessage] = useState('');

  const observerTarget = useRef(null);

  const LIMIT = 5;

  const sortByCreatedAtDesc = (list) =>
    [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!id) return;
      try {
        const subjectData = await subjectApi.getById(id);
        setSubject(subjectData);
        setQuestionCount(subjectData.questionCount || 0);

        const questionData = await questionApi.getBySubject(id, {
          limit: LIMIT,
          offset: 0,
        });

        const results = questionData?.results || [];
        const sorted = sortByCreatedAtDesc(results);

        setQuestions(sorted);
        setHaveMoreQuestions(results.length === LIMIT);
        setPagingByOffset(LIMIT);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        SetLoadingMoreQuestions(false);
      }
    };
    fetchInitialData();
  }, [id]);

  const loadMoreQuestions = useCallback(async () => {
    if (!id || loadingMoreQuestions || !haveMoreQuestions) return;

    try {
      //불러오는 동안 로딩
      SetLoadingMoreQuestions(true);
      //다음 질문 세트 불러오기
      const questionData = await questionApi.getBySubject(id, {
        limit: LIMIT,
        offset: pagingByOffset,
      });

      const newQuestions = questionData?.results || [];
      //만약 다음 질문 세트의 길이가 0보다 크면 로드
      if (newQuestions.length > 0) {
        //이전 로딩된 질문 + 새로운 질문
        setQuestions((prev) => sortByCreatedAtDesc([...prev, ...newQuestions]));
        //이전 offset + 5
        setPagingByOffset((prev) => prev + LIMIT);
        setHaveMoreQuestions(newQuestions.length === LIMIT);
      } else {
        setHaveMoreQuestions(false);
      }
      //아니라면 끝
    } catch (error) {
      console.error('추가 질문 로딩 실패', error);
    } finally {
      SetLoadingMoreQuestions(false);
    }
  }, [id, loadingMoreQuestions, haveMoreQuestions, pagingByOffset]);

  //스크롤 감지
  useEffect(() => {
    //감지기 선언
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          haveMoreQuestions &&
          !loadingMoreQuestions
        ) {
          loadMoreQuestions();
        }
      },
      {
        rootMargin: '300px',
      }
    );

    //현재 타겟 선언
    const currentObservingTarget = observerTarget.current;

    //만약 현재 타켓이 있으면 감지기가 현재 타겟을 가리키도록 함
    if (currentObservingTarget) {
      observer.observe(currentObservingTarget);
    }

    return () => {
      if (currentObservingTarget) {
        observer.unobserve(currentObservingTarget);
      }
    };
  }, [loadMoreQuestions, haveMoreQuestions, loadingMoreQuestions]);

  const questionList = questions.map((q) => (
    <FeedBox
      key={q.id}
      questionData={q}
      user={subject}
      mode={mode}
      onDeleteSuccess={(deletedQuestionId) => {
        if (!deletedQuestionId) return;

        setQuestions((prev) =>
          prev.filter((item) => item.id !== deletedQuestionId)
        );
        setQuestionCount((prev) => Math.max(prev - 1, 0));
        setDeleteCompleteMessage('질문이 삭제되었습니다.');
        setIsDeleteCompleteOpen(true);
      }}
    />
  ));

  return (
    <>
      <div className="feed-page-wrapper">
        {/* <div className="back-button">
          <img src={iconArrowLeft} alt="뒤로 가기" className="back-icon" />
          <span>뒤로</span>
        </div> */}
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

          {haveMoreQuestions && (
            <div
              ref={observerTarget}
              style={{ height: '20px', textAlign: 'center', padding: '20px' }}
            >
              {loadingMoreQuestions && <div>질문 로딩중</div>}
            </div>
          )}
        </div>
      </div>
      <DeleteCompleteModal
  isOpen={isDeleteCompleteOpen}
  onClose={() => setIsDeleteCompleteOpen(false)}
  message={deleteCompleteMessage}
/>
    </>
  );
};

export default FeedContainer;
