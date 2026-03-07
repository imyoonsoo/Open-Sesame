import { Link } from 'react-router-dom';
import Messages from "../../../../assets/images/Messages.svg";
import './FeedCard.css';

function FeedCard({ item }) {
  return (
    // 카드 전체를 클릭하면 해당 subject의 페이지로 이동
    <Link to={`/post/${item.id}`} className="feed-card">

      {/* 질문 대상 프로필 이미지 */}
      <div className="feed-avatar">
        <img src={item.imageSource} alt={item.name} />
      </div>

      {/* 질문 대상 이름 */}
      <div className="feed-name">{item.name}</div>

      {/* 받은 질문 개수 표시 */}
      <div className="feed-meta">
        <img src={Messages} alt="다음 페이지" />
        받은 질문 {item.questionCount}개
      </div>

    </Link>
  );
}

export default FeedCard;