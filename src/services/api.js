import axios from 'axios';

const api = axios.create({
  baseURL: 'https://60f3ac72-53e4-4d5c-82be-c8ae20443f0d.mock.pstmn.io'
})

export default api;