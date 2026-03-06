import axios from '../utils/axios'

// 질문 대상(Subject) 목록 조회 API
// limit : 한 번에 가져올 데이터 개수
// offset : 몇 개의 데이터를 건너뛸지 (페이지 계산에 사용)
// sort : 정렬 기준 (time | name)
export const getSubjects = async ({ limit = 8, offset = 0, sort = 'time' }) => {

  // /subjects/ 엔드포인트로 GET 요청
  // params로 전달한 값은 query string으로 변환됨
  const res = await axios.get('/subjects/', {
    params: { limit, offset, sort },
  })

  // 실제 데이터는 res.data 안에 들어 있음
  return res.data
}