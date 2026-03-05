import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://openmind-api.vercel.app/23-4',
});

export default axios;