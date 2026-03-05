import SortDropdown from '../../sortdropdown/SortDropdown';

function ListHeader({ title, sort, options, onChangeSort }) {
  return (
    <div className="list-header">
      <h1 className="list-title">{title}</h1>
      <SortDropdown value={sort} options={options} onChange={onChangeSort} />
    </div>
  );
}

export default ListHeader;