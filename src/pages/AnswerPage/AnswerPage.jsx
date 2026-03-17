import PostLayout from '@/components/post/PostLayout/PostLayout';
import FeedContainer from '@/components/answer/FeedContainer/FeedContainer';

function AnswerPage() {
  return (
    <PostLayout>
      <FeedContainer />
    </PostLayout>
  );
}

export default AnswerPage;