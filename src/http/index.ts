import qs from 'qs';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestInterceptors, CancelRequestSource, RequestConfig } from './types/types';
class Request {
  // axios实例
  instance: AxiosInstance;

  // 拦截器对象
  interceptorsObj?: RequestInterceptors;

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

  //创建实例的方法：constructor()构造实例
  constructor(config: RequestConfig) {
    this.requestUrlList = []; // url列表
    this.cancelRequestSourceList = []; // 取消请求列表
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;

    // 添加全局请求拦截器，每个实例都有
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log('全局请求拦截', config);
        return config;
      },
      (err: any) => err
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptor,
      this.interceptorsObj?.requestInterceptorCatch // 请求失败的拦截器
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorsCatch
    );

    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        console.log('全局响应拦截', config);

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
    sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex as number, 1);
  }

  // 二次封装网络请求的方法
  // index.ts
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      const url = config.url;
      // url存在 保存当前请求url 和 取消请求方法
      if (url) {
        this.requestUrlList?.push(url);
        // TODO 在axios0.22起，对CancelToken已经弃用，需要改成  AbortController 文档：https://axios-http.com/docs/cancellation
        const controller = new AbortController();//构造实例化一个AbortController对象控制器
        config.signal = controller.signal//绑定请求
        this.cancelRequestSourceList?.push({
          [url]: controller//将该控制器添加入cancelRequestSourceList数组
        })
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
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor<T>(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
        .finally(() => {
          url && this.delUrl(url);// 请求执行完毕,删除保存在数组中的url和该请求的取消方法
        });
    })
  }

  // 取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      //  取消单个请求
      const sourceIndex = this.getSourceIndex(url);
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url].abort();
    } else {
      // 存在多个需要取消请求的地址
      url.forEach((u) => {
        const sourceIndex = this.getSourceIndex(u);
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u].abort();
      });
    }
  }

  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0];
      source[key].abort();
    })
  }

}
export default Request;
// 暂时没懂啥意思
export { RequestConfig, RequestInterceptors };
