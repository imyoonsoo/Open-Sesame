import Logo from '@/assets/images/img-logo.svg'; // 로고 이미지 import
import { Link } from 'react-router-dom'; // 페이지 이동용 컴포넌트
import './ListTopBar.css';
import useLocalStorage from '@/hooks/useLocalStorage';

function ListTopBar() {
  const [subjectId] = useLocalStorage('userId', '');
  return (
    <div className="headerLeft">
      <Link to="/" className="headerLogo" aria-label="홈으로 이동">
        <img src={Logo} alt="오픈마인드 로고" width="153" />
      </Link>

      <Link to={`/post/${subjectId}/answer`} className="answerBtn">
        답변하러 가기
      </Link>
    </div>
  );
}

export default ListTopBar;
