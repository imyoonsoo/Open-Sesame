import SortDropdown from '../../sortdropdown/SortDropdown'
import './ListHeader.css'

function ListHeader({ title, sort, options, onChangeSort }) {
  return (
    <div className="list-header">
      {/* 페이지 제목 */}
      <h1 className="list-title">{title}</h1>

      {/* 정렬 드롭다운 영역 */}
      {/* 별도 div로 감싸서 제목 아래 가운데 정렬하기 쉽게 구조 분리 */}
      <div className="list-sort">
        <SortDropdown
          value={sort}          // 현재 선택된 정렬값
          options={options}     // 정렬 옵션 목록
          onChange={onChangeSort} // 정렬 변경 시 실행
        />
      </div>
    </div>
  )
}

export default ListHeader