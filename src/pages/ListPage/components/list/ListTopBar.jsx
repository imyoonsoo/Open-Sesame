import Logo from '../../../../assets/images/logo.svg'; // 로고 이미지 import
import ReplyButton from '../../../../assets/images/Reply.svg'; // 로고 이미지 import
import { Link, NavLink } from 'react-router-dom'; // 페이지 이동용 컴포넌트
import './ListTopBar.css';

function ListTopBar() {
  return (
    <div className="headerLeft">
      <Link to="/" className="headerLogo" aria-label="홈으로 이동">
        <img src={Logo} alt="오픈마인드 로고" width="153" />
      </Link>

      <Link to="/post/:id/answer" className="go-answer-btn" aria-label="답변페이지 이동">
        <img src={ReplyButton} alt="답변 버튼" width="153" />
      </Link>
    </div>
  );
}

export default ListTopBar;
