import './PostHeader.css';
import { useNavigate } from 'react-router-dom';
import LinkVector from '@/assets/icons/icon-share-link.svg';
import KakaoVector from '@/assets/icons/icon-share-kakao.svg';
import FacebackVector from '@/assets/icons/icon-share-facebook.svg';
import OpenSesameBackground from '@/assets/images/img-header-openmind.png';
import OpenSesameLogo from '@/assets/images/OpenSesame/OpenSesame_logo.svg';
import Defaultprofile from '@/assets/images/OpenSesame/OpenSesame_profile.svg';

/* ShareButton 컴포넌트 (링크, 카카오, 페이스북) */
function ShareButton({ className, icon, alt, onClick }) {
  return (
    <button
      className={className}
      onClick={(e) => {
        /* 이벤트 버블링 적용 */
        e.stopPropagation();
        onClick?.();
      }}
    >
      <img src={icon} alt={alt} />
    </button>
  );
}

function PostHeader({
  name = '나는 참깨',
  profile = Defaultprofile,
  linkIcon,
  kakaoIcon,
  facebookIcon,
}) {
  const navigate = useNavigate();
  return (
    <div id="postpage-header">
      <img
        className="post-header"
        src={OpenSesameBackground}
        alt="배경"
        onClick={() => navigate('/')}
      />
      <div className="post-content">
        <img
          className="post-logo"
          src={OpenSesameLogo}
          alt="로고"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/');
          }}
        />
        <img
          className="post-profile"
          src={profile}
          alt="프로필"
          onClick={(e) => e.stopPropagation()}
        />
        <p className="post-name">{name}</p>
        <div className="post-share">
          <ShareButton
            className="post-linkBtn"
            icon={LinkVector}
            alt="링크"
            onClick={linkIcon}
          />
          <ShareButton
            className="post-kakaoBtn"
            icon={KakaoVector}
            alt="카카오"
            onClick={kakaoIcon}
          />
          <ShareButton
            className="post-facebookBtn"
            icon={FacebackVector}
            alt="페이스북"
            onClick={facebookIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
