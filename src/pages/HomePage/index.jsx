import footerImg from '@/assets/images/img-footer-logo.png';
import GoQuestionButton from '@/components/home/GoQuestionButton/GoQuestionButton';
import LogoButton from '@/components/home/LogoButton/LogoButton';
import QuestionForm from '@/components/home/QuestionForm/QuestionForm';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="top-area">
        <GoQuestionButton />
      </div>

      <div className="main-area">
        <LogoButton />

        <div className="mobile-button">
          <GoQuestionButton />
        </div>

        <QuestionForm />
      </div>

      <img src={footerImg} alt="sesame character img" className="main-footer-image" />
    </div>
  );
}

export default HomePage;