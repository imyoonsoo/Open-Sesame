function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        type="button"
        className="page-btn"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        &lt;
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`page-btn ${p === current ? 'active' : ''}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className="page-btn"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;