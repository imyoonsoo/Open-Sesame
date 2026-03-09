import '../components/PostHeader.css';
import linkVector from '../../../assets/images/Link.svg';
import KakaoVector from '../../../assets/images/Kakaotalk.svg';
import facebookVector from '../../../assets/images/Facebook.svg';

/* 오픈참깨 에셋 */
import OpenSesame_bg from '../../../assets/images/OpenSesame/OpenSesame_bg.png';
import OpenSesame_logo from '../../../assets/images/OpenSesame/OpenSesame_logo.svg';
import OpenSesame_profile from '../../../assets/images/OpenSesame/OpenSesame_profile.svg';

/* ShareButton 컴포넌트 (링크, 카카오, 페이스북) */
function ShareButton({ className, icon, alt, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img src={icon} alt={alt} />
    </button>
  );
}

function PostHeader({ name, profile, linkIcon, kakaoIcon, facebookIcon }) {
  return (
    <div id="postpage-header">
      <img className="post-header" src={OpenSesame_bg} alt="OpenMind 헤더" />

      <div className="post-content">
        <img className="post-logo" src={OpenSesame_logo} alt="OpenMind 로고" />
        <img
          className="post-profile"
          src={OpenSesame_profile}
          alt="OpenMind 프로필"
        />
        <p className="post-name">{name}</p>
        <div className="post-share">
          <ShareButton
            className="post-linkBtn"
            icon={linkVector}
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
            icon={facebookVector}
            alt="페이스북"
            onClick={facebookIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
