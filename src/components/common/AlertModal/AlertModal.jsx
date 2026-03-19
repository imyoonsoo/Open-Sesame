import './AlertModal.css';
import AotIcon from '@/assets/icons/icon-aot.svg';
import SeedIcon from '@/assets/icons/icon-seed.svg';

export function AlertModal({ text, onConfirm, onCancel }) {
  return (
    <div className="alert-modal">
      <div className="alert-modal__icon">
        <img src={AotIcon} alt="" />
        <img src={SeedIcon} alt="" />
      </div>

      <p className="alert-modal__text">{text}</p>

      <div className="alert-modal__actions">
        <button
          className="alert-modal__button alert-modal__button--confirm"
          onClick={onConfirm}
        >
          확인
        </button>
        <button
          className="alert-modal__button alert-modal__button--cancel"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default AlertModal;
