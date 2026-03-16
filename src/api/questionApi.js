import axios from '@/utils/axios';

export const questionApi = {
  // 질문 생성
  create: async (subjectId, content) => {
    const res = await axios.post(`/subjects/${subjectId}/questions/`, {
      content,
    });
    return res.data;
  },

  // 질문 삭제
  delete: async (subjectId) => {
    const res = await axios.delete(`/subjects/${subjectId}/`);
    return res.data;
  },

  // 특정 대상의 질문 목록 조회
  getBySubject: async (subjectId, { limit = 8, offset = 0 } = {}) => {
    const res = await axios.get(`/subjects/${subjectId}/questions/`, {
      params: { limit, offset },
    });
    return res.data;
  },
};
