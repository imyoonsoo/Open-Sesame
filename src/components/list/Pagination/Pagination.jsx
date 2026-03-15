import './Pagination.css';
import LeftArrow from '@/assets/icons/icon-arrow-left.svg';
import RightArrow from '@/assets/icons/icon-arrow-right.svg';
import DoubleLeftArrow from '@/assets/icons/icon-doublearrow-left.svg';
import DoubleRightArrow from '@/assets/icons/icon-doublearrow-right.svg';

function Pagination({ current, total, onChange }) {
  // 페이지가 1개면 페이지네이션을 굳이 보여줄 필요 없음
  if (total <= 1) return null;

  // 한 번에 보여줄 페이지 개수 (5개씩)
  const PAGE_GROUP_SIZE = 5;

  // 현재 페이지가 속한 그룹의 시작 번호
  // 예)
  // current = 1 ~ 5  → 1
  // current = 6 ~ 10 → 6
  const groupStart =
    Math.floor((current - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;

  // 현재 그룹의 마지막 페이지
  // total보다 넘어가지 않도록 처리
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, total);

  // 현재 그룹에서 보여줄 페이지 배열 생성
  // 예: [6,7,8,9,10]
  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i
  );

  // 이전 페이지 이동
  const handlePrevPage = () => {
    if (current > 1) onChange(current - 1);
  };

  // 다음 페이지 이동
  const handleNextPage = () => {
    if (current < total) onChange(current + 1);
  };

  // 이전 페이지 그룹 이동 (예: 6~10 → 1~5)
  const handlePrevGroup = () => {
    const prevGroupPage = Math.max(groupStart - PAGE_GROUP_SIZE, 1);
    onChange(prevGroupPage);
  };

  // 다음 페이지 그룹 이동 (예: 1~5 → 6~10)
  const handleNextGroup = () => {
    const nextGroupPage = Math.min(groupStart + PAGE_GROUP_SIZE, total);
    onChange(nextGroupPage);
  };

  return (
    <div className="pagination">
      {/* 이전 그룹 이동 (<<) */}
      <button
        type="button"
        className="page-btn arrow double-arrow"
        disabled={groupStart === 1} // 첫 그룹이면 비활성화
        onClick={handlePrevGroup}
      >
        <img src={DoubleLeftArrow} alt="이전 그룹" />
      </button>

      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        className="page-btn arrow"
        disabled={current === 1} // 첫 페이지면 비활성화
        onClick={handlePrevPage}
      >
        <img src={LeftArrow} alt="이전 페이지" />
      </button>

      {/* 페이지 번호 버튼 목록 */}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`page-btn ${p === current ? 'active' : ''}`} // 현재 페이지 강조
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        className="page-btn arrow"
        disabled={current === total} // 마지막 페이지면 비활성화
        onClick={handleNextPage}
      >
        <img src={RightArrow} alt="다음 페이지" />
      </button>

      {/* 다음 그룹 이동 (>>) */}
      <button
        type="button"
        className="page-btn arrow double-arrow"
        disabled={groupEnd === total} // 마지막 그룹이면 비활성화
        onClick={handleNextGroup}
      >
        <img src={DoubleRightArrow} alt="다음 그룹" />
      </button>
    </div>
  );
}

export default Pagination;
