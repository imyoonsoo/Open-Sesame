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
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setIsToast(true);
    setTimeout(() => setIsToast(false), 5000);
  };

  const ShareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '야옹이',
          description: '신나는 노래 추천 받습니다!!!!!',
          imageUrl:
            'https://images.pet-friends.co.kr/v2/community/2025/11/16/f80f0c50-abed-431b-ad7c-63b1007b7eab.jpeg?f=webp',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  const ShareFacebook = () => {
    const currentUrl = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    );
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
