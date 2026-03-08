import '../components/PostHeader.css';
import OpenMindHeader from '../../../assets/images/OpenMindHeader.png';
import OpenMindLogo from '../../../assets/images/OpenMindLogo.svg';
import linkVector from '../../../assets/images/Link.svg';
import KakaoVector from '../../../assets/images/Kakaotalk.svg';
import facebookVector from '../../../assets/images/Facebook.svg';

/* ShareButton 컴포넌트 추가 (링크, 카카오, 페이스북) */
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
      <img className="post-header" src={OpenMindHeader} alt="OpenMind 헤더" />

      <div className="post-content">
        <img className="post-logo" src={OpenMindLogo} alt="OpenMind 로고" />
        <img className="post-profile" src={profile} alt="OpenMind 프로필" />
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
