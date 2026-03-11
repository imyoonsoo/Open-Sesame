import SearchIcon from '../../../assets/icons/icon-search.svg'
import './SearchInput.css'

function SearchInput({ value, onChange, onSubmit }) {
  // Enter 키를 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className="list-search">
      <div className="search-input-wrapper">
        {/* 검색 아이콘 */}
        <img
          src={SearchIcon}
          alt="검색 아이콘"
          className="search-icon"
        />

        {/* 사용자 검색 input */}
        <input
          type="text"
          className="search-input"
          placeholder="사용자 검색하기"
          value={value} // 현재 입력 값
          onChange={(e) => onChange(e.target.value)} // 입력 상태 업데이트
          onKeyDown={handleKeyDown} // Enter 검색
        />
      </div>
    </div>
  )
}

export default SearchInput