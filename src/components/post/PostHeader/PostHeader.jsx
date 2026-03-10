import './PostHeader.css';
import LinkVector from '@/assets/images/icon-share-link.svg';
import KakaoVector from '@/assets/icons/icon-share-kakao.svg';
import FacebackVector from '@/assets/icons/icon-share-facebook.svg';

/* 오픈참깨 에셋 */
import OpenSesameBackground from '@/assets/images/OpenSesame/OpenSesame_bg.png';
import OpenSesameLogo from '@/assets/images/OpenSesame/OpenSesame_logo.svg';
import OpenSesameDefaultprofile from '@/assets/images/OpenSesame/OpenSesame_profile.svg';

/* ShareButton 컴포넌트 (링크, 카카오, 페이스북) */
function ShareButton({ className, icon, alt, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img src={icon} alt={alt} />
    </button>
  );
}

function PostHeader({
  name,
  profile = OpenSesameDefaultprofile,
  linkIcon,
  kakaoIcon,
  facebookIcon,
}) {
  return (
    <div id="postpage-header">
      <img
        className="post-header"
        src={OpenSesameBackground}
        alt="OpenMind 헤더"
      />

      <div className="post-content">
        <img className="post-logo" src={OpenSesameLogo} alt="OpenMind 로고" />
        <img className="post-profile" src={profile} alt="OpenMind 프로필" />
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
