import './AlertModal.css';
import AotIcon from '@/assets/icons/icon-aot.svg';
import SeedIcon from '@/assets/icons/icon-seed.svg';

export function AlertModal() {
  return (
    <div className="alert-modal">
      <div className="alert-modal__icon">
        <img src={AotIcon} alt="" />
        <img src={SeedIcon} alt="" />
      </div>

      <p className="alert-modal__text">
        참깨님에게 보낸 답변을 <br />
        삭제하시겠습니까?
      </p>

      <div className="alert-modal__actions">
        <button className="alert-modal__button alert-modal__button--confirm">
          확인
        </button>
        <button className="alert-modal__button alert-modal__button--cancel">
          취소
        </button>
      </div>
    </div>
  );
}
