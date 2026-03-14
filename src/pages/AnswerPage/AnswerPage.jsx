import React from 'react';
import FeedContainer from '@/components/answer/FeedContainer/FeedContainer';
import PostHeader from '@/components/post/PostHeader/PostHeader';

function AnswerPage() {
  return (
    <div>
      <PostHeader />
      <FeedContainer />
    </div>
  );
}

export default AnswerPage;
