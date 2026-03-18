import './PostHeader.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkVector from '@/assets/icons/icon-share-link.svg';
import KakaoVector from '@/assets/icons/icon-share-kakao.svg';
import FacebackVector from '@/assets/icons/icon-share-facebook.svg';
import OpenSesameBackground from '@/assets/images/img-footer-logo.png';
import OpenSesameLogo from '@/assets/images/OpenSesame/OpenSesame_logo.svg';
import Defaultprofile from '@/assets/images/OpenSesame/OpenSesame_profile.svg';
import EditNameField from '@/components/post/EditNameField/EditNameField';
import useEditUsername from '@/hooks/useEditUsername';
import OptionDropdown from '@/components/post/OptionDropdown/OptionDropdown';

/* ShareButton 컴포넌트 (링크, 카카오, 페이스북) */
function ShareButton({ className, icon, alt, onClick }) {
  return (
    <button
      className={className}
      onClick={(e) => {
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
  onClickDelete,
}) {
  const navigate = useNavigate();

  const { isEditing, username, setUsername, setIsEditing, handleSave } =
    useEditUsername();

  // 선택한 대상 이름이 바뀌면 input 값도 같이 맞춰줌
  useEffect(() => {
    setUsername(name || '');
  }, [name, setUsername]);

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
          src={profile || Defaultprofile}
          alt="프로필"
          onClick={(e) => e.stopPropagation()}
        />

        <div className="post-name-row">
          {isEditing ? (
            <EditNameField
              username={username}
              onChange={(e) => setUsername(e.target.value)}
              onSave={handleSave}
            />
          ) : (
            <p className="post-name">{name}</p>
          )}

          <OptionDropdown
            onClickEdit={() => setIsEditing(true)}
            onClickDelete={onClickDelete}
          />
        </div>

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