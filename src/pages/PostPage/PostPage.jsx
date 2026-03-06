import '../PostPage/PostPage.css';
import PostHeader from './components/PostHeader';
import Profile from '../../assets/images/Profile.png';
import { useState, useEffect } from 'react';

function PostPage() {
  const [data, setData] = useState({
    name: '아초는 고양이',
    profile: Profile,
  });

  const [isToast, setIsToast] = useState(false); // 토스트 기본 설정 -> false

  const CopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsToast(true);
    setTimeout(() => setIsToast(false), 5000);
  };

  const ShareKakao = () => {
    /* 구현 중 */
    alert('카카오톡 공유!');
  };

  const ShareFacebook = () => {
    /* 구현 중 */
    alert('페이스북 공유!');
  };

  return (
    <>
      <PostHeader
        {...data}
        onClick_Link={CopyLink}
        onClick_Kakao={ShareKakao}
        onClick_Facebook={ShareFacebook}
      />
      {isToast && <div className="toast-msg">URL이 복사되었습니다!</div>}
    </>
  );
}

export default PostPage;
