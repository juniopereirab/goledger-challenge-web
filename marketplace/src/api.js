import axios from 'axios';

const api = axios.create({
    baseURL: 'http://ec2-54-173-117-139.compute-1.amazonaws.com/api'
});

export default api;