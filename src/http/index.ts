import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RequestInterceptors, CancelRequestSource, RequestConfig } from './types/types';

class Request {
  // axios实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  /*
  存放取消方法的集合
  * 在创建请求后将取消请求方法 push 到该集合中
  * 封装一个方法，可以取消请求，传入 url: string|string[]  
  * 在请求之前判断同一URL是否存在，如果存在就取消请求
  */
  cancelRequestSourceList?: CancelRequestSource[];
  /*
  存放所有请求URL的集合
  * 请求之前需要将url push到该集合中
  * 请求完毕后将url从集合中删除
  * 添加在发送请求之前完成，删除在响应之后删除
  */
  requestUrlList?: string[];

  // 构造函数
  constructor(config: RequestConfig) {
    this.requestUrlList = [];
    this.cancelRequestSourceList = []; // 取消请求列表
    this.instance = axios.create(config); //  创建axios实例
    this.interceptorsObj = config.interceptors;// 获取请求拦截器和响应拦截器
    // 拦截器执行顺序：接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('res', res);
        return res;
      },
      (err: any) => err
    );
    // 使用实例拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,// 在发送请求之前做些什么
      this.interceptorsObj?.requestInterceptorsCatch // 对错误的请求做些什么
    );
    // 相应拦截器
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,// 2xx 范围内的状态码都会触发该函数。对响应数据做点什么
      this.interceptorsObj?.responseInterceptorsCatch// 超出 2xx 范围的状态码都会触发该函数。对响应错误做点什么
    );
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 接口的数据都在res.data下，所以直接返回res.data
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: any) => {
        return {
          status: 500,
          message: err
        };
      }
    );
  }
  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
      return Object.keys(item)[0] === url;
    }) as number;
  }
  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   * @returns {*}
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex((u) => u === url);
    const sourceIndex = this.getSourceIndex(url);
    // 删除url和cancel方法
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1);
    sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex, 1);
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      const url = config.url;
      // url存在 保存当前请求url 和 取消请求方法
      if (url) {
        this.requestUrlList?.push(url);
        // TODO 在axios0.22起，对CancelToken已经弃用，需要改成  AbortController 文档：https://axios-http.com/docs/cancellation
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancelRequestSourceList?.push({
            [url]: c
          });
        });
      }
      if (!config.headers) {
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
      }
      // 序列化
      if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
        // 序列化post参数
        config.data = qs.stringify(config.data);
      }
      // 设置token
      if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token') as string;
      }
      console.log('config', config);
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果给单个响应设置拦截器,这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }
  // 取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      //  取消单个请求
      const sourceIndex = this.getSourceIndex(url);
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
    } else {
      // 存在多个需要取消请求的地址
      url.forEach((u) => {
        const sourceIndex = this.getSourceIndex(u);
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]();
      });
    }
  }
  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0];
      source[key]();
    });
  }
}

export default Request;

export { RequestConfig, RequestInterceptors };
