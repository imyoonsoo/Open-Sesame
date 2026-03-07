import { useState, useEffect } from 'react';
import { useShare } from '@/hooks/useShare';
import '../PostPage/PostPage.css';
import Profile from '@/assets/images/img-profile.svg';
import PostHeader from './components/PostHeader';
import NoQuestion from './components/NoQuestion';
import QuestionButton from './components/QuestionButton';

function PostPage() {
  const [data, setData] = useState({
    name: '아초는 고양이',
    profile: Profile,
  });

  const [isToast, setIsToast] = useState(false); // 토스트 기본 설정 false
  const { copyLink, shareKakao, shareFacebook } = useShare(setIsToast);

  return (
    <>
      <PostHeader {...data} />
      {isToast && <div className="toast-msg">URL이 복사되었습니다!</div>}
      <NoQuestion />
      <QuestionButton />
    </>
  );
}

export default PostPage;
