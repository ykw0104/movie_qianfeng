import axios from "axios"
import { Toast } from "vant";

const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    "X-Client-Info":
      '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596502176387264316178433","bc":"310100"}',
  }
});

http.interceptors.request.use(function (config) {

  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });

  return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {

  Toast.clear()

  return response;
}, function (error) {
  return Promise.reject(error);
});

export default http

