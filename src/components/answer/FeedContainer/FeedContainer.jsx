import React from 'react';
import './FeedContainer.css';
import FeedBox from '../FeedBox/FeedBox';
import iconMessages from '@/assets/icons/icon-messages.svg';
import iconArrowLeft from '@/assets/icons/icon-arrow-left.svg';

const FeedContainer = () => {
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
            <span className="message-text">n개의 질문이 있습니다</span>
        </div>
        <FeedBox />
        </div>
    </div>
    </>
  );
};

export default FeedContainer;