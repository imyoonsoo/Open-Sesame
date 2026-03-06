import './NoQuestion.css';
import Inbox from '../../../assets/images/Inbox.svg';
import Question from '../../../assets/images/Question.svg';

function NoQuestion() {
  return (
    <>
      <div id="mailbox">
        <div className="header">
          <img className="questionIcon" src={Question} alt="질문" />
          <p className="questionState-text">{'아직 질문이 없습니다'}</p>
        </div>
        <img className="inboxIcon" src={Inbox} alt="질문함" />
      </div>
    </>
  );
}

export default NoQuestion;
