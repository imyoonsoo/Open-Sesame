import './LogoButton.css';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/images/img-logo-large.png';

function LogoButton() {
  return (
    <div className="logo-botton">
      <Link to="/" className="logo-link">
        <img src={logoImg} alt="Open Sesame Logo" className="logo-image" />
      </Link>
    </div>
  );
}

export default LogoButton;