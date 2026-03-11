export function useShare(setShowToast) {
  const copyLink = async () => {
    const currentUrl = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        // 최신 Clipboard API
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // 폴백: 옛날 방식 (일부 모바일/브라우저용)
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch (e) {
      console.error('클립보드 복사 실패:', e);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
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
