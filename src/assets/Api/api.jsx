import axios from 'axios';

const apiclient=axios.create({
  baseURL: 'https://hackstreak-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiclient;