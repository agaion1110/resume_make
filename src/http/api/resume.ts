import http from '../request';
// 查询模板列表
export const getTemplateListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getTemplateList',
    method: 'get',
    params: params,
    interceptors: {
      requestInterceptor: config => {
        console.log('接口请求拦截',config)
        return config;
      },
      responseInterceptor: res => { 
        console.log('接口响应拦截')
        return res;
      }
    }
  });
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return http.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return http.cancelAllRequest()
}