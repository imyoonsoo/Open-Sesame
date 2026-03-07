// import './QuestionForm.css';
// import nameicon from '../../../../assets/images/nameicon.png';

// function QuestionForm() {
//   return (
//     <div className="question-card">
//       <div className="input-wrapper">
//         <img src={nameicon} alt="" className="input-icon" />

//         <input
//           type="text"
//           placeholder="이름을 입력하세요"
//           className="name-input"
//         />
//       </div>

//       <button className="submit-button">질문 받기</button>
//     </div>
//   );
// }

// export default QuestionForm;

import './QuestionForm.css';
import { Link } from 'react-router-dom';
import nameicon from '@/assets/images/img-input-name.png';

function QuestionForm() {
  return (
    <div className="question-card">
      <div className="input-wrapper">
        <img src={nameicon} alt="" className="input-icon" />

        <input
          type="text"
          placeholder="이름을 입력하세요"
          className="name-input"
        />
      </div>

      <Link to="/list" className="submit-button">
        질문 받기
      </Link>
    </div>
  );
}

export default QuestionForm;