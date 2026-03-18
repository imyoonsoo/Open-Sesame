import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import AlertModal from '@/components/common/AlertModal/AlertModal';
import { subjectApi } from '@/api';

function PostLayout({
  children,
  linkIcon,
  kakaoIcon,
  facebookIcon,
  setShowToast,
  setToastMessage,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState({
    name: '',
    profile: '',
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 질문대상 조회
  useEffect(() => {
    if (!id) return;

    const fetchSubject = async () => {
      try {
        const data = await subjectApi.getById(id);

        setSubject({
          id: data.id,
          name: data.name,
          profile: data.imageSource,
          questionCount: data.questionCount,
          createdAt: data.createdAt,
        });
      } catch (error) {
        console.error('질문대상 조회 실패..', error);
      }
    };

    fetchSubject();
  }, [id]);

  // 질문대상 삭제 함수
  const handleDeleteSubject = async () => {
    try {
      await subjectApi.delete(Number(id));

      console.log('삭제 완료');

      // 토스트 함수가 있으면 실행
      setToastMessage?.('탈퇴가 완료되었습니다.');
      setShowToast?.(true);

      setIsDeleteModalOpen(false);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <div className="postpage-wrapper">
      <PostHeader
        name={subject.name}
        profile={subject.profile}
        linkIcon={linkIcon}
        kakaoIcon={kakaoIcon}
        facebookIcon={facebookIcon}
        onClickDelete={() => {
          console.log('탈퇴하기 클릭됨');
          setIsDeleteModalOpen(true);
        }}
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

{typeof children === 'function' ? children(subject) : children}
    </div>
  );
}

export default PostLayout;
