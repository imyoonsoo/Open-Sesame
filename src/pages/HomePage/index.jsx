import './HomePage.css';
import GoQuestionButton from './components/GoQuestionButton/GoQuestionButton';
import LogoBotton from './components/LogoBotton/LogoBotton';
import QuestionForm from './components/QuestionForm/QuestionForm';
import papercupimg from '../../assets/images/papercupimg.png';

function HomePage() {
  return (
    <div className="home-page">
      <div className="top-area">
        <GoQuestionButton />
      </div>

      <div className="main-area">
        <LogoBotton />
        <QuestionForm />
      </div>

      <img src={papercupimg} alt="" className="papercup-image" />
    </div>
  );
}

export default HomePage;