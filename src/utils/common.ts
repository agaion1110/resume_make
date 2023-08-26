import appStore from '@/store';
import { uuid } from 'vue-uuid';
import moment from 'moment'; //  日期处理

// 生成uuid（唯一标识id，为组件添加key）
export const getUuid = (): string => {
    return uuid.v4().split('-').join('');
}

// 开启全局等待层
export const openGlobalLoading = () => {
    const { changeLoading } = appStore.useLoadingStore;
    changeLoading(true);
};
// 关闭全局等待层
export const closeGlobalLoading = () => {
    const { changeLoading } = appStore.useLoadingStore;
    changeLoading(false);
};

// 日期格式化 -> 某年某月某日
export const formatDateToYMD = (dateString: string): string => {
    if (dateString) {
      return moment(new Date(dateString)).format('YYYY 年 MM 月 DD 日');
    } else {
      return '暂无数据';
    }
  };
// 获取 src/assets/material 下的静态资源
export const getAssetsMaterialFile = (path: string, url: string) => {
  return new URL(`../assets/images/material/${path}/${url}`, import.meta.url).href;
};
// 获取简历背景小图片资源
export const getAssetsResumeBgcFile = (url: string) => {
  return new URL(`../assets/images/resumeBackground/${url}`, import.meta.url).href;
};