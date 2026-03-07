export function useShare(setIsToast) {
  const copyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setIsToast(true);
    setTimeout(() => setIsToast(false), 5000);
  };

  const shareKakao = () => {
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

  const shareFacebook = () => {
    const currentUrl = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    );
  };

  return { copyLink, shareKakao, shareFacebook };
}
