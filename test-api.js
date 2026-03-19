import axios from 'axios';
axios.get('https://openmind-api.vercel.app/23-4/subjects/?limit=100').then(res => {
  const s = res.data.results.find(s => s.questionCount > 0);
  if (s) {
    return axios.get(`https://openmind-api.vercel.app/23-4/subjects/${s.id}/questions/`);
  }
}).then(res => {
  if (res && res.data && res.data.results.length > 0) {
    console.log(res.data.results[0]);
  }
}).catch(console.error);
