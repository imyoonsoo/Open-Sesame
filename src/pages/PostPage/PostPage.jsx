import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShare } from '@/hooks/useShare';
import { getSubject, getSubjects } from '@/api/openmindApi';
import PostHeader from '@/components/post/PostHeader/PostHeader';
import NoQuestion from '@/components/post/NoQuestion/NoQuestion';
import QuestionButton from '@/components/post/QuestionButton/QuestionButton';
import './PostPage.css';

function PostPage() {
  const { id } = useParams();
  const [data, setData] = useState({ name: undefined, profile: undefined });

  const [showToast, setShowToast] = useState(false);
  const [renderToast, setRenderToast] = useState(false);
  const { copyLink, shareKakao, shareFacebook } = useShare(setShowToast);

  // 질문대상 조회 API
  useEffect(() => {
    if (!id) return;
    const fetchSubject = async () => {
      try {
        const subject = await getSubject(id);
        setData({
          id: subject.id,
          name: subject.name,
          profile: subject.imageSource,
          questionCount: subject.questionCount,
          createdAt: subject.createdAt,
        });
      } catch (error) {
        console.error('질문대상 조회 실패..', error);
      }
    };
    fetchSubject();
  }, [id]);

  // 질문대상 목록 조회 API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectList = await getSubjects({});
        console.log('질문대상 목록 조회 성공! ', subjectList.results);
      } catch (error) {
        console.error('목록 데이터 조회 실패..', error);
      }
    };
    fetchSubjects();
  }, []);

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
