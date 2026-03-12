import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShare } from '@/hooks/useShare';
import { getSubjects } from '@/api/openmindApi';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';
import './PostPage.css';

function PostPage() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: undefined,
    profile: undefined,
  });

  const [showToast, setShowToast] = useState(false);
  const [renderToast, setRenderToast] = useState(false);
  const { copyLink, shareKakao, shareFacebook } = useShare(setShowToast);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const result = await getSubjects({ limit: 5 });
        console.log('리스폰스', result);
        console.log('target', target);
        console.log('id', target);
        if (target) {
          setData({
            name: target.name,
            profile: target.imageSource,
          });
          console.log('API 연동 성공!', result);
        }
      } catch (error) {
        console.error('API 연동 실패...', error);
      }
    };

    if (id) fetchSubjectData();
  }, [id]);

  useEffect(() => {
    if (showToast) {
      setRenderToast(true);
      return;
    }
    const EXIT_MS = 250;
    const t = setTimeout(() => setRenderToast(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <div className="postpage-wrapper">
      <PostHeader
        name={data.name}
        profile={data.profile}
        linkIcon={copyLink}
        kakaoIcon={shareKakao}
        facebookIcon={shareFacebook}
      />
      {renderToast && (
        <div className={`toast-msg ${showToast ? 'toast-in' : 'toast-out'}`}>
          URL이 복사되었습니다!
        </div>
      )}
      <div className="content-area">
        <NoQuestion />
        <QuestionButton />
      </div>
    </div>
  );
}

export default PostPage;
