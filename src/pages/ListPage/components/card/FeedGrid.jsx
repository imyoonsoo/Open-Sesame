import FeedCard from './FeedCard';

function FeedGrid({ items, onClickCard }) {
  return (
    // 질문 대상 카드들을 그리드 형태로 배치하는 영역
    <div className="feed-grid">
      {items.map((item) => (
        <FeedCard
          key={item.id} // React 리스트 렌더링 시 필요한 고유 key
          item={item}   // 카드에 표시할 데이터 전달
          onClick={() => onClickCard(item.id)} // 카드 클릭 시 해당 id 전달
        />
      ))}
    </div>
  );
}

export default FeedGrid;