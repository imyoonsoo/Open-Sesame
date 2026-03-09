import "./Pagination.css";
import LeftArrow from "@/assets/icons/icon-arrow-left.svg";
import RightArrow from "@/assets/icons/icon-arrow-right.svg";

function Pagination({ current, total, onChange }) {
  // 페이지가 1개뿐이면 페이지네이션을 표시하지 않음
  if (total <= 1) return null;

  // 전체 페이지 번호 배열 생성    예: [1,2,3,4,5]
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        className="page-btn arrow"
        disabled={current === 1} // 첫 페이지에서는 비활성화
        onClick={() => onChange(current - 1)}
      >
        <img src={LeftArrow} alt="이전 페이지" />
      </button>

      {/* 페이지 번호 버튼 목록 */}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`page-btn ${p === current ? "active" : ""}`} // 현재 페이지 강조
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        className="page-btn arrow"
        disabled={current === total} // 마지막 페이지에서는 비활성화
        onClick={() => onChange(current + 1)}
      >
        <img src={RightArrow} alt="다음 페이지" />
      </button>
    </div>
  );
}

export default Pagination;