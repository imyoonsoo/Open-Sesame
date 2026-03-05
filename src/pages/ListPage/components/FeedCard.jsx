import "./FeedCard.css";
import messageIcon from '/src/assets/images/Messages.svg';

function FeedCard({ item, onClick }) {
  return (
    <button className="feed-card" type="button" onClick={onClick}>
      <div className="feed-profile">
        <div className="feed-avatar">
          <img src={item.imageSource} alt={`${item.name} 프로필`} />
        </div>
        <div className="feed-name">{item.name}</div>
      </div>
      <div className="feed-meta">
        <span className="feed-meta-left">
          <img src={messageIcon} alt="질문 아이콘" />
            <span>받은 질문</span>
        </span>
        <span>{item.questionCount}개</span>
      </div>
    </button>
  );
}

export default FeedCard;