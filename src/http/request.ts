import Request from "./index";
import CONFIG from "@/config";
import {RequestConfig} from "./types/types";
import { AxiosResponse } from "axios";

// 创建一个axios实例
const http = new Request({
  baseURL: CONFIG.serverAddress,
  timeout: CONFIG.maxTimeout,
  interceptors: {
    requestInterceptor: config => {
      console.log('实例请求拦截器:',config);
      return config;
    },
    responseInterceptor: result => { 
      console.log('实例响应拦截器');
      return result;
    }
  }
})
export default http;