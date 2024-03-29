
import axios from 'axios';

let baseURL = 'http://47.52.57.206:8000/api/v1/';
if(process.env.NODE_ENV === 'production'){
  baseURL = '/api/v1/';
}

var instance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
