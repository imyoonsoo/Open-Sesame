import './PostPage.css';
import { useState, useEffect } from 'react';
import { useShare } from '@/hooks/useShare';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';
import { Modal } from '@/components/common/Modal';
import InputTextArea from '@/components/common/InputTextArea/InputTextArea';
import { useFileUpload } from '@/hooks/useFileUpload';
import { postQuestion } from '@/api/openmindApi';

function PostPage() {
  const [data, setData] = useState({
    name: undefined,
    profile: undefined,
  });

  const [showToast, setShowToast] = useState(false); // 토스트
  const [renderToast, setRenderToast] = useState(false); // 렌더링
  const { copyLink, shareKakao, shareFacebook } = useShare(setShowToast);

  // 모달
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
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
      await postQuestion(13467, message);
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
    </>
  );
}

export default PostPage;
