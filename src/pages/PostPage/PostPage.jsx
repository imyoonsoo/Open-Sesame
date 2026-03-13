import { useState, useEffect, useRef } from 'react';
import { useShare } from '@/hooks/useShare';
import '../PostPage/PostPage.css';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';
// import Modal from '...';
// import InputTextArea from '...';

function PostPage() {
  const [data, setData] = useState({
    name: undefined,
    profile: undefined,
  });

  const [isToast, setIsToast] = useState(false);

  // 아래 상태/함수들은 실제 사용 중이면 선언되어 있어야 함
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const { copyLink, shareKakao, shareFacebook } = useShare(setIsToast);

  const handleCloseModal = () => {
    setIsQuestionModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    // 제출 로직
  };

  return (
    <>
      <div className="postpage-wrapper">
        <PostHeader
          {...data}
          linkIcon={copyLink}
          kakaoIcon={shareKakao}
          facebookIcon={shareFacebook}
        />

        {isToast && <div className="toast-msg">URL이 복사되었습니다!</div>}

        <div className="content-area">
          <NoQuestion />
          <QuestionButton />
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