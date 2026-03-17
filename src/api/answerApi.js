import axios from '@/utils/axios';

export const answerApi = {
  // 답변 생성
  create: async (questionId, data) => {
    const res = await axios.post(`/questions/${questionId}/answers/`, data);
    return res.data;
  },

  // 답변 삭제
  delete: async (questionId) => {
    const res = await axios.delete(`/answers/${questionId}/`);
    return res.data;
  },
};