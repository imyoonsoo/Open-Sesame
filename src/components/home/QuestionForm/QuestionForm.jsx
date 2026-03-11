import { Link } from 'react-router-dom';
import { useState } from 'react';
import nameicon from '@/assets/images/img-input-name.png';
import InputField from '@/components/common/InputField/InputField';
import './QuestionForm.css';

function QuestionForm() {
  const [name, setName] = useState('');

  const isDisabled = name.trim() === '';

  return (
    <div className="question-card">
      <InputField
        placeholder="이름을 입력하세요"
        icon={nameicon}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Link
        to={isDisabled ? '#' : '/list'}
        className={`submit-button ${isDisabled ? 'disabled' : ''}`}
        onClick={(e) => {
          if (isDisabled) e.preventDefault();
        }}
      >
        질문 받기
      </Link>
    </div>
  );
}

export default QuestionForm;