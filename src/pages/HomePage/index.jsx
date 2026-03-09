import './HomePage.css';
import papercupimg from '@/assets/images/img-decoration-papercup.png';
import GoQuestionButton from '@/components/home/GoQuestionButton/GoQuestionButton';
import LogoButton from '@/components/home/LogoButton/LogoButton';
import QuestionForm from '@/components/home/QuestionForm/QuestionForm';

function HomePage() {
  return (
    <div className="home-page">
      <div className="top-area">
        <GoQuestionButton />
      </div>

      <div className="main-area">
        <LogoButton />
        <QuestionForm />
      </div>

      <img src={papercupimg} alt="" className="papercup-image" />
    </div>
  );
}

export default HomePage;
