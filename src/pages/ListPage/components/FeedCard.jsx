function FeedCard({ item, onClick }) {
  return (
    <button className="feed-card" type="button" onClick={onClick}>
      <div className="feed-avatar">
        <img src={item.imageSource} alt={`${item.name} 프로필`} />
      </div>

      <div className="feed-name">{item.name}</div>

      <div className="feed-meta">
        <span>받은 질문</span>
        <span>{item.questionCount}개</span>
      </div>
    </button>
  );
}

export default FeedCard;