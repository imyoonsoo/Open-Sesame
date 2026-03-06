import Axios from 'axios'

// OpenMind API 요청을 위한 axios 인스턴스 생성
// baseURL을 설정해두면 이후 요청에서 주소를 반복 작성하지 않아도 됨
const axios = Axios.create({
  baseURL: 'https://openmind-api.vercel.app/23-4', // 우리 팀(23기 4팀) API 기본 주소
})

// 다른 파일에서 사용할 수 있도록 export
export default axios