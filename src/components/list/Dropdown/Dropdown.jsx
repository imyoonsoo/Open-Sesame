import { useEffect, useRef, useState } from 'react';
import './Dropdown.css';
import ArrowDown from '../../../assets/icons/icon-arrow-down.svg';
import ArrowUp from '../../../assets/icons/icon-arrow-up.svg';

function SortDropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);

  // 드롭다운 전체 영역을 참조해서 바깥 클릭 여부를 확인
  const dropdownRef = useRef(null);

  // 현재 선택된 옵션 label 찾기
  const currentLabel = options.find((opt) => opt.value === value)?.label || '';

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 드롭다운 바깥을 클릭한 경우 닫기
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 사라질 때 이벤트 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sortDropdown" ref={dropdownRef}>
      {/* 현재 선택된 정렬 기준 버튼 */}
      <button
        type="button"
        className="sortButton"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{currentLabel}</span>

        {/* 열림/닫힘 상태에 따라 화살표 이미지 변경 */}
        <img
          src={open ? ArrowUp : ArrowDown}
          alt="정렬 화살표"
          className="sortButtonArrow"
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <ul className="sortMenu">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={`sortItem ${value === opt.value ? 'active' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
