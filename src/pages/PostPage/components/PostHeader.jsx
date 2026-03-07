import '../components/PostHeader.css';
import OpenMindHeader from '../../../assets/images/OpenMindHeader.png';
import OpenMindLogo from '../../../assets/images/OpenMindLogo.svg';
import LinkVector from '../../../assets/images/Link.svg';
import KakaoVector from '../../../assets/images/Kakaotalk.svg';
import FacebackVector from '../../../assets/images/Facebook.svg';
import { useState, useEffect } from 'react';

/* 코드 구조가 반복되어 ShareButton 추가 */
function ShareButton({ className, icon, alt, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img src={icon} alt={alt} />
    </button>
  );
}

function PostHeader({
  name,
  profile,
  onClick_Link,
  onClick_Kakao,
  onClick_Facebook,
}) {
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
            icon={LinkVector}
            alt="링크"
            onClick={onClick_Link}
          />
          <ShareButton
            className="post-kakaoBtn"
            icon={KakaoVector}
            alt="카카오"
            onClick={onClick_Kakao}
          />
          <ShareButton
            className="post-facebookBtn"
            icon={FacebackVector}
            alt="페이스북"
            onClick={onClick_Facebook}
          />
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
