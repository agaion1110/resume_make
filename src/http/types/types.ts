import { AxiosRequestConfig, AxiosResponse } from "axios";

// 拦截器的类型
export interface RequestInterceptors {
  // 请求拦截器
  // 在发送请求之前做些什么
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 对请求错误做些什么
  requestInterceptorCatch?: (error: any) => any;

  // 响应拦截器
  // 对响应数据做点什么
  responseInterceptor?: <T = AxiosResponse>(result: T) => T
  // 对响应错误做点什么
  responseInterceptorsCatch?: (err: any) => any;
}
// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig{
  interceptors?: RequestInterceptors;
}

export interface CancelRequestSource { 
  // 取消请求的标识
  [index: string]: AbortController;
}