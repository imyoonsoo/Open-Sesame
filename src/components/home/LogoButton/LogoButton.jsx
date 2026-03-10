import { Link } from 'react-router-dom';
import logoImg from '@/assets/images/img-main-logo.png';
import './LogoButton.css';

function LogoButton() {
  return (
    <div className="logo-button">
      <Link to="/" className="logo-link">
        <img src={logoImg} alt="Open Sesame Logo" className="logo-image" />
      </Link>
    </div>
  );
}

export default LogoButton;