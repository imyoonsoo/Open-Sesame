import './QuestionButton.css';

function QuestionButton() {
  return (
    <>
      <div id="questionBtn-box">
        <button
          className="questionBtn"
          onClick={() => {
            /* 질문하기 모달창(Modal)과 연결  */
          }}
        >
          <p className="text">질문 작성하기</p>
        </button>
      </div>
    </>
  );
}

export default QuestionButton;
