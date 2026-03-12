import './QuestionButton.css';
import { useNavigate } from 'react-router-dom';

function QuestionButton({}) {
  const navigate = useNavigate();
  return (
    <>
      <div id="questionBtn-box">
        <button
          className="questionBtn"
          onClick={() => {
            navigate('/c');
          }}
        >
          <p className="text-not-mobile">질문 작성하기</p>
          <p className="text-mobile">질문 작성</p>
        </button>
      </div>
    </>
  );
}

export default QuestionButton;
