import CloseIcon from '@/assets/icons/icon-close.svg';
import MenuIcon from '@/assets/icons/icon-menu.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './FloatingMenu.css';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const userId = localStorage.getItem('userId');

  return (
    <div className="floating-menu">
      <button className="floating-menu-btn" onClick={toggleButton}>
        {isOpen ? (
          <img src={CloseIcon} className="icon-menu-close" />
        ) : (
          <img src={MenuIcon} className="icon-menu-open" />
        )}
      </button>
      <div className={`floating-items ${isOpen ? 'open' : ''}`}>
        <Link to="/list" className="floating-item">
          참깨리스트
        </Link>
        <Link to={`/post/${userId}/answer`} className="floating-item">
          마이페이지
        </Link>
      </div>
    </div>
  );
};
export default FloatingMenu;
