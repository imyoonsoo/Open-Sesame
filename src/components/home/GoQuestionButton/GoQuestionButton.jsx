import './GoQuestionButton.css';
import { Link } from 'react-router-dom';

function GoQuestionButton() {
  return (
      <Link to="/list" className="go-questionBtn">
        질문하러 가기
      </Link>
  );
}

export default GoQuestionButton;
