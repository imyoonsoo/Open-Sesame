import { useState } from 'react';
import './Modal.css';
import CloseIcon from '@/assets/icons/icon-close.svg';
import MessagesIcon from '@/assets/icons/icon-messages.svg';
import DefaultImg from '@/assets/images/img-profile-default.svg';
import InputTextArea from '@/components/common/InputTextArea/InputTextArea';
import { useFileUpload } from '@/hooks/useFileUpload';
import { postQuestion } from '@/api/openmindApi';

export function Modal({ subjectId = 13467 }) {
  const [message, setMessage] = useState('');
  const {
    selectedFile,
    previewUrl,
    fileInputRef,
    handleFileButtonClick,
    handleFileChange,
    handleRemoveFile,
  } = useFileUpload();

  const isSubmitDisabled = message.trim().length === 0;

  const handleModalInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await postQuestion(subjectId, message);
      setMessage('');
      handleRemoveFile();
    } catch (error) {
      console.error('질문 등록 실패', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal__header">
        <div className="modal__title-wrapper">
          <img src={MessagesIcon} alt="메시지 아이콘" />
          <div className="modal__title">질문을 작성하세요</div>
        </div>
        <button className="modal__close-button">
          <img src={CloseIcon} alt="닫기" />
        </button>
      </div>
      <div className="modal__user-info">
        <span>To.</span>
        <img src={DefaultImg} alt="사용자 프로필" />
        <span>아초는고양이</span>
      </div>
      <div className="modal__body">
        <InputTextArea
          className="modal__input"
          value={message}
          onChange={handleModalInput}
          placeholder="질문을 입력해주세요"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="modal__file-input-hidden"
          onChange={handleFileChange}
        />

        {!selectedFile ? (
          <button
            type="button"
            className="modal__file-button"
            onClick={handleFileButtonClick}
          >
            파일 첨부
          </button>
        ) : (
          <div className="modal__file-preview">
            <div className="modal__file-thumbnail">
              {previewUrl && (
                <img src={previewUrl} alt="첨부 이미지 미리보기" />
              )}
            </div>

            <span className="modal__file-name">{selectedFile.name}</span>

            <button
              type="button"
              className="modal__file-remove-button"
              onClick={handleRemoveFile}
            >
              <img src={CloseIcon} alt="첨부 파일 삭제" />
            </button>
          </div>
        )}

        <button
          className="modal__submit-button"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          질문 보내기
        </button>
      </div>
    </div>
  );
}
