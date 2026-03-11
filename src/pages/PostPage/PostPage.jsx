import './PostPage.css';
import { useState, useEffect } from 'react';
import { useShare } from '@/hooks/useShare';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';

function PostPage() {
  const [data, setData] = useState({
    name: undefined,
    profile: undefined,
  });

  const [showToast, setShowToast] = useState(false); // 토스트
  const [renderToast, setRenderToast] = useState(false); // 렌더링
  const { copyLink, shareKakao, shareFacebook } = useShare(setShowToast);

  useEffect(() => {
    if (showToast) {
      setRenderToast(true);
      return;
    }

    const EXIT_MS = 250;
    const t = setTimeout(() => setRenderToast(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <>
      <div className="postpage-wrapper">
        <PostHeader
          {...data}
          linkIcon={copyLink}
          kakaoIcon={shareKakao}
          facebookIcon={shareFacebook}
        />
        {renderToast && (
          <div className={`toast-msg ${showToast ? 'toast-in' : 'toast-out'}`}>
            URL이 복사되었습니다!
          </div>
        )}
        <div className="content-area">
          <NoQuestion />
          <QuestionButton />
        </div>
      </div>
    </>
  );
}

export default PostPage;
