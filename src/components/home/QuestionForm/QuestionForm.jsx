import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nameicon from '@/assets/images/img-input-name.png';
import InputField from '@/components/common/InputField/InputField';
import useLocalStorage from '@/hooks/useLocalStorage';
import SubmitButton from '../SubmitButton/SubmitButton';
import { subjectApi } from '@/api';
import './QuestionForm.css';

function QuestionForm() {
  // 페이지 이동 함수 생성
  const navigate = useNavigate();

  // 이름 입력값은 새로고침하면 초기화되도록 일반 state로 관리
  const [value, setValue] = useState('');

  // localStorage에는 생성된 유저 id, image만 저장
  // setter만 사용하기 위해 ',' 사용
  const [, setUserId] = useLocalStorage('userId', '');
  const [, setUserImage] = useLocalStorage('userImage', '');

  const isDisabled = value.trim() === '';

  const handleSubmit = async () => {
    // 내용이 없으면 submit 비활성화
    if (isDisabled) return;

    try {
      const subject = await subjectApi.create(value);

      // localStorage에 id, image 저장
      localStorage.setItem('userId', subject.id);
      setUserId(subject.id);
      setUserImage(subject.imageSource);

      // React Router에서 페이지 이동할 때 사용하는 hook
      navigate(`/post/${subject.id}/answer`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="question-card">
      <InputField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="이름을 입력하세요"
        icon={nameicon}
      />

      <SubmitButton
        className={`submit-button ${isDisabled ? 'disabled' : ''}`}
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        질문 받기
      </SubmitButton>
    </div>
  );
}

export default QuestionForm;
