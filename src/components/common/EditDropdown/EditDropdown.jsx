import React, { useEffect, useRef, useState } from 'react';
import './EditDropdown.css';
import editIcon from '../../../assets/icons/icon-edit.png';
import deleteIcon from '../../../assets/icons/icon-delete.png';

function EditDropdown({ onEdit, onDelete, prefixLabel = '', showEdit = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="edit-dropdown" ref={dropdownRef}>
      <button className="edit-dropdown-trigger" onClick={handleToggle}>
        ...
      </button>

      {isOpen && (
        <div className="edit-dropdown-menu">
          {showEdit && (
            <button
              className="edit-dropdown-item"
              onClick={() => {
                setIsOpen(false);
                onEdit?.();
              }}
            >

            <img src={editIcon} alt="수정" className="edit-dropdown-icon" />
            <span>{prefixLabel} 수정하기</span>
          </button>
    )}
          <button
            className="edit-dropdown-item delete"
            onClick={() => {
              setIsOpen(false);
              onDelete?.();
            }}
          >
            <img src={deleteIcon} alt="삭제" className="edit-dropdown-icon" />
            <span>{prefixLabel} 삭제하기</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default EditDropdown;