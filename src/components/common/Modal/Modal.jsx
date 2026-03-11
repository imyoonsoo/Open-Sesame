import { useState, useRef } from 'react';
import './Modal.css';
import CloseIcon from '@/assets/icons/icon-close.svg';
import MessagesIcon from '@/assets/icons/icon-messages.svg';
import DefaultImg from '@/assets/images/img-profile-default.svg';
import InputTextArea from '@/components/common/InputTextArea/InputTextArea';

export function Modal() {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const isSubmitDisabled = message.trim().length === 0 && selectedFile === null;

  const handleModalInput = (e) => {
    setMessage(e.target.value);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    setMessage('');
    setSelectedFile(null);
    setFilePreview(null);
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
