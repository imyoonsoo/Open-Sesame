import { useState } from 'react';
import './Modal.css';
import CloseIcon from '@/assets/icons/icon-close.svg';
import MessagesIcon from '@/assets/icons/icon-messages.svg';
import DefaultImg from '@/assets/images/img-profile-default.svg';
import InputTextArea from '@/components/common/InputTextArea/InputTextArea';

export function Modal() {
  const [isModalInputEmpty, setIsModalInputEmpty] = useState(true);

  const handleModalInput = (e) => {
    const value = e.target.value;
    setIsModalInputEmpty(value.trim().length === 0);
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
          onChange={handleModalInput}
          placeholder="질문을 입력해주세요"
        />
        <button className="modal__submit-button" disabled={isModalInputEmpty}>
          질문 보내기
        </button>
      </div>
    </div>
  );
}
