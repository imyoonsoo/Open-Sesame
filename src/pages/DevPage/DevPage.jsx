import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import InputTextArea from '@/components/common/InputTextArea/InputTextArea';
import { useFileUpload } from '@/hooks/useFileUpload';

function DevPage() {
  const [message, setMessage] = useState('');
  const {
    selectedFile,
    previewUrl,
    fileInputRef,
    handleFileButtonClick,
    handleFileChange,
    handleRemoveFile,
  } = useFileUpload();

  return (
    <>
      <Modal>
        <Modal.Header 
          title="질문을 작성하세요" 
          onClose={() => alert('닫기!')} 
        />
        <Modal.Avatar name="아초는고양이" />
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
            onClick={() => alert(`입력값: ${message}`)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DevPage;