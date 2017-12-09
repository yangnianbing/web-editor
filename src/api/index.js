import axios from 'axios';

const instance = axios.create({
  baseUrl: 'https://api.github.com'
})

export default function api (method, url, param, success, fail) {
  instance[method](url, param).then(resp => {
    success(resp);
  }).catch(error => {
    success(error);
    // fail(error);
  })
}
