import http from '../request';

// 查询赞助
export const getSponsorListAsync: any = (params: any) => { 
    return http.request({
        url: '/huajian/common/getSponsorList',
        method: 'get',
        params: params
    });
}