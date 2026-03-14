import SortDropdown from '../Dropdown/Dropdown'
import SearchInput from '../Search/SearchInput'
import './ListHeader.css'

function ListHeader({
  title,
  sort,
  options,
  onChangeSort,
  searchInput,
  onChangeSearchInput,
  onSubmitSearch,
}) {
  return (
    <div className="list-header">
      {/* 페이지 제목 */}
      <h1 className="list-title">{title}</h1>

      {/* 정렬 + 검색 영역 */}
      <div className="list-header-controls">
        {/* 정렬 드롭다운 */}
        <div className="list-sort">
          <SortDropdown
            value={sort}
            options={options}
            onChange={onChangeSort}
          />
        </div>

        {/* 검색 입력 컴포넌트 */}
        <SearchInput
          value={searchInput}
          onChange={onChangeSearchInput}
          onSubmit={onSubmitSearch}
        />
      </div>
    </div>
  )
}

export default ListHeader