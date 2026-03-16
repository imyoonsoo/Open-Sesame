import axios from '@/utils/axios';

export const subjectApi = {
  // 대상 생성
  create: async (name) => {
    const res = await axios.post('/subjects/', { name });
    return res.data;
  },

  // 대상 목록 조회
  getAll: async ({ limit = 8, offset = 0, sort = 'time' } = {}) => {
    const res = await axios.get('/subjects/', {
      params: { limit, offset, sort },
    });
    return res.data;
  },

  // 대상 세부 정보 조회
  getById: async (subjectId) => {
    const res = await axios.get(`/subjects/${subjectId}/`);
    return res.data;
  },
};
