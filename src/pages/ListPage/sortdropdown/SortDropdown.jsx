import './SortDropdown.css'
import ArrowDown from '@/assets/icons/icon-arrow-down.svg'

function SortDropdown({ value, options, onChange }) {
  return (
    // select와 화살표 이미지를 함께 배치하기 위한 wrapper
    <div className="sortSelectWrap">
      <select
        className="sortSelect"
        value={value} // 현재 선택된 정렬값
        onChange={(e) => onChange(e.target.value)} // 값 변경 시 상위 컴포넌트에 전달
      >
        {/* 전달받은 정렬 옵션 목록을 option으로 렌더링 */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* select 기본 화살표 대신 사용하는 커스텀 아이콘 */}
      <img className="sortArrow" src={ArrowDown} alt="정렬 화살표" />
    </div>
  )
}

export default SortDropdown