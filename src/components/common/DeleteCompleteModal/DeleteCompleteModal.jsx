import React from 'react';
import './DeleteCompleteModal.css';
import deleteCompleteImage from "@/assets/icons/icon-delete-answer.png";

const DeleteCompleteModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-complete-overlay">
      <div className="delete-complete-modal">
        <img
          src={deleteCompleteImage}
          alt="삭제 완료"
          className="delete-complete-image"
        />
        <p className="delete-complete-message">{message}</p>
        <button className="delete-complete-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default DeleteCompleteModal;