import './Modal.css';
import CloseIcon from '@/assets/icons/icon-close.svg';
import MessagesIcon from '@/assets/icons/icon-messages.svg';
import DefaultImg from '@/assets/images/img-profile-default.svg';

export function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

function Header({ title, onClose}) {
  return (
    <div className="modal__header">
      <div className="modal__title-wrapper">
        <img src={MessagesIcon} alt="메시지 아이콘" />
        <div className="modal__title">{title}</div>
      </div>
        <button className="modal__close-button" onClick={onClose}>
          <img src={CloseIcon} alt="닫기" />
        </button>
    </div>
  );
}

function Avatar({ name, src = DefaultImg }) {
  return (
    <div className="modal__user-info">
      <span>To.</span>
      <img src={src} alt="사용자 프로필" />
      <span>{name}</span>
    </div>
  );
}

function Body({ children }) {
  return <div className="modal__body">{children}</div>;
}

function FileUpload({ selectedFile, previewUrl, onAttach, onRemove }) {
  return !selectedFile ? (
    <button type="button" className="modal__file-button" onClick={onAttach}>
      파일 첨부
    </button>
  ) : (
    <div className="modal__file-preview">
      <div className="modal__file-thumbnail">
        {previewUrl && <img src={previewUrl} alt="첨부 이미지 미리보기" />}
      </div>
      <span className="modal__file-name">{selectedFile.name}</span>
      <button
        type="button"
        className="modal__file-remove-button"
        onClick={onRemove}
      >
        <img src={CloseIcon} alt="첨부 파일 삭제" />
      </button>
    </div>
  );
}

function SubmitButton({ disabled, onClick, children = '질문 보내기' }) {
  return (
    <button className="modal__submit-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

Modal.Header = Header;
Modal.Avatar = Avatar;
Modal.Body = Body;
Modal.FileUpload = FileUpload;
Modal.SubmitButton = SubmitButton;