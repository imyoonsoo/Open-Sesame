import React, { useEffect, useRef, useState } from 'react';
import './EditDropdown.css';

function EditDropdown({ onEdit, onDelete }) {
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
          <button
            className="edit-dropdown-item"
            onClick={() => {
              setIsOpen(false);
              onEdit?.();
            }}
          >
            수정하기
          </button>

          <button
            className="edit-dropdown-item delete"
            onClick={() => {
              setIsOpen(false);
              onDelete?.();
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default EditDropdown;