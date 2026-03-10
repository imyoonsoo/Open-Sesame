import './QuestionButton.css';

function QuestionButton() {
  return (
    <>
      <div id="questionBtn-box">
        <button
          className="questionBtn"
          onClick={() => {
            /* 질문하기 모달과 연결  */
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
