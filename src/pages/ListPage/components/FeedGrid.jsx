import FeedCard from './FeedCard';

function FeedGrid({ items, onClickCard }) {
  return (
    <div className="feed-grid">
      {items.map((item) => (
        <FeedCard
          key={item.id}
          item={item}
          onClick={() => onClickCard(item.id)}
        />
      ))}
    </div>
  );
}

export default FeedGrid;
