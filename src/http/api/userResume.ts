import http from '../request';

// 发布为线上简历
export const publishOnlineResumeAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/userresume/publishOnline',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  });
};

// 查询用户的在线简历
export const getOnlineResumeAsync: any = (id: string) => {
  return http.request({
    url: `/huajian/common/getOnlineResume/${id}`,
    method: 'get'
  });
};
