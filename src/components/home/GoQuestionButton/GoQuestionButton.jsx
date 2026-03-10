import { Link } from 'react-router-dom';
import './GoQuestionButton.css';

function GoQuestionButton() {
  return (
      <Link to="/list" className="go-questionBtn">
        질문하러 가기
      </Link>
  );
}

export default GoQuestionButton;
