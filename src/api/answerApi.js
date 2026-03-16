import axios from '@/utils/axios';

export const answerApi = {
  // 답변 생성
  create: async (questionId, data) => {
    const res = await axios.post(`/questions/${questionId}/answers/`, data);
    return res.data;
  },
};
