import './PostPage.css';
import { useState, useEffect } from 'react';
import { useShare } from '@/hooks/useShare';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';
import AlertModal from '@/components/common/AlertModal/AlertModal';

function PostPage() {
  const [data, setData] = useState({
    name: undefined,
    profile: undefined,
  });

  const [showToast, setShowToast] = useState(false); // 토스트
  const [renderToast, setRenderToast] = useState(false); // 렌더링
  const { copyLink, shareKakao, shareFacebook } = useShare(setShowToast);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (showToast) {
      setRenderToast(true);
      return;
    }

    const EXIT_MS = 250;
    const t = setTimeout(() => setRenderToast(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleDeleteSubject = async () => {
    try {
      console.log('삭제 진행');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <>
      <div className="postpage-wrapper">
        <PostHeader
          {...data}
          linkIcon={copyLink}
          kakaoIcon={shareKakao}
          facebookIcon={shareFacebook}
          onClickEditName={() => setIsEditModalOpen(true)}
          onClickDelete={() => setIsDeleteModalOpen(true)}
        />
        {isDeleteModalOpen && (
          <div
            className="modal-overlay"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <AlertModal
                text="정말로 탈퇴하시겠습니까?"
                onConfirm={handleDeleteSubject}
                onCancel={() => setIsDeleteModalOpen(false)}
              />
            </div>
          </div>
        )}
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
