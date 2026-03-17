import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShare } from '@/hooks/useShare';
import { questionApi } from '@/api';
import PostLayout from '@/components/post/PostLayout/PostLayout';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';
import { Modal } from '@/components/common/Modal';
import InputTextArea from '@/components/common/InputTextArea/InputTextArea';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';
import FeedContainer from '@/components/answer/FeedContainer/FeedContainer';
import './PostPage.css';

function PostPage() {
  const { id } = useParams();

  const [showToast, setShowToast] = useState(false);
  const [renderToast, setRenderToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { copyLink, shareKakao, shareFacebook } = useShare(setShowToast);

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
      await questionApi.create(Number(id), message);
      handleCloseModal();
      setTimeout(() => {
        window.location.href = `/post/${id}`;
      }, 1000);
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

  // 링크 복사 토스트와 삭제 토스트를 같이 쓰기 위해 감싸는 함수
  const handleCopyLink = () => {
    setToastMessage('URL이 복사되었습니다!');
    copyLink();
  };

  return (
    <PostLayout
      linkIcon={handleCopyLink}
      kakaoIcon={shareKakao}
      facebookIcon={shareFacebook}
      setShowToast={setShowToast}
      setToastMessage={setToastMessage}
    >
      {(subject) => (
        <>
          {renderToast && (
            <div
              className={`toast-msg ${showToast ? 'toast-in' : 'toast-out'}`}
            >
              {toastMessage}
            </div>
          )}

          <div className="content-area">
            <FeedContainer mode="view" />
            <QuestionButton onClick={handleOpenModal} />
          </div>

          {isQuestionModalOpen && (
            <div className="modal-overlay" onClick={handleCloseModal}>
              <div onClick={(e) => e.stopPropagation()}>
                <Modal>
                  <Modal.Header
                    title="질문을 작성하세요"
                    onClose={handleCloseModal}
                  />
                  <Modal.Avatar
                    name={subject.name || '질문 대상'}
                    src={subject.profile}
                  />
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
        </>
      )}
    </PostLayout>
  );
}

export default PostPage;
