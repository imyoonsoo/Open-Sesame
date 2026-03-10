import { useState, useEffect } from 'react';
import { useShare } from '@/hooks/useShare';
import '../PostPage/PostPage.css';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';

function PostPage() {
  const [data, setData] = useState({
    name: undefined,
    profile: undefined,
  });

  const [isToast, setIsToast] = useState(false);
  const { copyLink, shareKakao, shareFacebook } = useShare(setIsToast);

  return (
    <>
      <div className="postpage-wrapper">
        <PostHeader
          {...data}
          linkIcon={copyLink}
          kakaoIcon={shareKakao}
          facebookIcon={shareFacebook}
        />
        {isToast && <div className="toast-msg">URL이 복사되었습니다!</div>}
        <div className="content-area">
          <NoQuestion />
          <QuestionButton />
        </div>
      </div>
    </>
  );
}

export default PostPage;
