import { useEffect, useRef, useState } from 'react';
import './OptionDropdown.css';
import OptionIcon from '@/assets/icons/icon-option.svg';

function OptionDropdown({ onClickEdit, onClickDelete }) {

  // 드롭다운 열림 / 닫힘 상태
  const [open, setOpen] = useState(false);

  // 드롭다운 영역을 참조하기 위한 ref
  const dropdownRef = useRef(null);

  useEffect(() => {

    // 드롭다운 바깥을 클릭하면 닫히도록 하는 함수
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // 마우스 클릭 이벤트 등록
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 사라질 때 이벤트 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 옵션 버튼 클릭 시 드롭다운 열기 / 닫기
  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  // 이름변경 클릭 시 실행
  const handleClickEdit = (e) => {
    e.stopPropagation();
    setOpen(false); // 메뉴 닫기
    onClickEdit?.(); // 부모에서 받은 함수 실행
  };

  // 탈퇴하기 클릭 시 실행
  const handleClickDelete = (e) => {
    e.stopPropagation();
    setOpen(false); // 메뉴 닫기
    onClickDelete?.(); // 부모에서 받은 함수 실행
  };

  return (
    <div className="optionDropdown" ref={dropdownRef}>
      
      {/* 옵션 메뉴 버튼 */}
      <button
        type="button"
        className="optionButton"
        onClick={handleToggleDropdown}
      >
        <img src={OptionIcon} alt="옵션 열기" className="optionButtonIcon" />
      </button>

      {/* open이 true일 때만 드롭다운 메뉴 표시 */}
      {open && (
        <ul className="optionMenu">
          <li>
            <button
              type="button"
              className="optionItem"
              onClick={handleClickEdit}
            >
              이름변경
            </button>
          </li>

          <li>
            <button
              type="button"
              className="optionItem"
              onClick={handleClickDelete}
            >
              탈퇴하기
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default OptionDropdown;