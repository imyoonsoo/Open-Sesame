import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShare } from '@/hooks/useShare';
import { subjectApi, questionApi } from '@/api';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';
import './PostPage.css';
import { Modal } from '@/components/common/Modal';
import InputTextArea from '@/components/common/InputTextArea/InputTextArea';
import { useFileUpload } from '@/hooks/useFileUpload';
import AlertModal from '@/components/common/AlertModal/AlertModal';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';

function PostPage() {
  const { id } = useParams();
  const [data, setData] = useState({ name: undefined, profile: undefined });
  const navigate = useNavigate(); // 삭제 후 홈으로 이동할 때 사용

  const [showToast, setShowToast] = useState(false);
  const [renderToast, setRenderToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { copyLink, shareKakao, shareFacebook } = useShare(setShowToast);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // onClickEditName 에러 방지용 상태 추가

  // 질문대상 조회 API
  useEffect(() => {
    if (!id) return;
    const fetchSubject = async () => {
      try {
        const subject = await subjectApi.getById(id);
        setData({
          id: subject.id,
          name: subject.name,
          profile: subject.imageSource,
          questionCount: subject.questionCount,
          createdAt: subject.createdAt,
        });
      } catch (error) {
        console.error('질문대상 조회 실패..', error);
      }
    };
    fetchSubject();
  }, [id]);

  // 질문대상 목록 조회 API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectList = await subjectApi.getAll({});
        console.log('질문대상 목록 조회 성공! ', subjectList.results);
      } catch (error) {
        console.error('목록 데이터 조회 실패..', error);
      }
    };
    fetchSubjects();
  }, []);
  // 모달
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  useModalScrollLock(isQuestionModalOpen);
  const [message, setMessage] = useState('');
  const {
    selectedFile,
    previewUrl,
    fileInputRef,
    handleFileButtonClick,
    handleFileChange,
    handleRemoveFile,
  } = useFileUpload();

  const handleOpenModal = () => {
    setIsQuestionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsQuestionModalOpen(false);
    setMessage('');
    handleRemoveFile();
  };

  const handleSubmit = async () => {
    try {
      await questionApi.create(13467, message);
      handleCloseModal();
    } catch (error) {
      console.error('질문 등록 실패:', error);
    }
  };

  useEffect(() => {
    if (showToast) {
      setRenderToast(true);
      return;
    }
    const EXIT_MS = 250;
    const t = setTimeout(() => setRenderToast(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [showToast]);

  // 링크 복사 토스트와 삭제 토스트를 같이 쓰기 위해 감싸는 함수로 변경
  const handleCopyLink = () => {
    setToastMessage('URL이 복사되었습니다!');
    copyLink();
  };

  // 질문대상 삭제 함수
  const handleDeleteSubject = async () => {
    try {
      await questionApi.delete(Number(id)); // data.id 대신 params id 사용

      console.log('삭제 완료');

      setToastMessage('탈퇴가 완료되었습니다.'); // 삭제 성공 토스트 문구
      setShowToast(true); // 삭제 성공 시 토스트 띄우기
      setIsDeleteModalOpen(false);

      setTimeout(() => {
        navigate('/');
      }, 1000); // 토스트 잠깐 보여주고 이동
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <div>
      <div className="postpage-wrapper">
        <PostHeader
          name={data.name}
          profile={data.profile}
          linkIcon={handleCopyLink} // 기존 copyLink 대신 토스트 문구까지 처리하는 함수 연결
          kakaoIcon={shareKakao}
          facebookIcon={shareFacebook}
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
            {toastMessage}
          </div>
        )}
        <div className="content-area">
          <NoQuestion />
          <QuestionButton onClick={handleOpenModal} />
        </div>
      </div>

      {isQuestionModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <Modal>
              <Modal.Header
                title="질문을 작성하세요"
                onClose={handleCloseModal}
              />
              <Modal.Avatar name={data.name || '아초는고양이'} />
              <Modal.Body>
                <InputTextArea
                  className="modal__input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="질문을 입력해주세요"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="modal__file-input-hidden"
                  onChange={handleFileChange}
                />
                <Modal.FileUpload
                  selectedFile={selectedFile}
                  previewUrl={previewUrl}
                  onAttach={handleFileButtonClick}
                  onRemove={handleRemoveFile}
                />
                <Modal.SubmitButton
                  disabled={message.trim().length === 0}
                  onClick={handleSubmit}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
