import axios from '@/utils/axios';

export const answerApi = {
  // 답변 생성
  create: async (questionId, data) => {
    const res = await axios.post(`/questions/${questionId}/answers/`, data);
    return res.data;
  },

  // 답변 삭제
  delete: async (answerId) => {
    const res = await axios.delete(`/answers/${answerId}/`);
    return res.data;
  },

  //답변 수정
    update: async (answerId, data) => {
      const res = await axios.put(`/answers/${answerId}/`, data);
      return res.data;
  },
};