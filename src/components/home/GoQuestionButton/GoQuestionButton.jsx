import './GoQuestionButton.css';
import { Link } from 'react-router-dom';

function GoQuestionButton() {
  return (
    <Link to="/list" className="go-question-button">
        <span>질문하러 가기 →</span>
    </Link>
  );
}

export default GoQuestionButton;