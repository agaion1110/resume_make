import appStore from '@/store';
import { uuid } from 'vue-uuid';
import moment from 'moment'; //  日期处理

// 生成uuid
export const getUuid = (): string => {
  return uuid.v4().split('-').join('');
};

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

// 格式化日期
export const formatListDate = (value: string) => {
  return moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss');
};

// 判断是否为JSON格式
export const isJSON = (str: string): boolean => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  return false;
};

// 获取 src/assets/material 下的静态资源
export const getAssetsMaterialFile = (path: string, url: string) => {
  return new URL(`../assets/images/material/${path}/${url}`, import.meta.url).href;
};

// 时间格式转化：['2015-5', '2019-6'] -> 2015.05 - 2019.06
export const formatDate = (dataArray: Array<string> | string): string => {
  if (Array.isArray(dataArray)) {
    const startDate = moment(new Date(dataArray[0])).format('YYYY.MM').split('-').join('.');
    let endDate;
    if (dataArray[1] === '至今') {
      endDate = '至今';
    } else {
      endDate = moment(new Date(dataArray[1])).format('YYYY.MM').split('-').join('.');
    }
    return `${startDate}-${endDate}`;
  } else {
    return moment(new Date(dataArray)).format('YYYY.MM').split('-').join('.');
  }
};

// 工具方法--px转数字
export const pxTonumber = (value: string | undefined): number => {
  if (value) {
    return Number(value.split('px')[0]);
  } else {
    return 0;
  }
};
// 工具方法--熟练度文字转数值
export const textToNumber = (value: string): number => {
  let number = 0;
  switch (value) {
    case '了解':
      number = 25;
      break;
    case '一般':
      number = 50;
      break;
    case '熟悉':
      number = 75;
      break;
    case '精通':
      number = 100;
      break;
  }
  return number;
};

// 工具方法--数值转熟练度文字方法
// 熟练度
export const numberToText = (value: number) => {
  if (value <= 25) {
    return '一般';
  } else if (value <= 50) {
    return '掌握';
  } else if (value <= 75) {
    return '熟练';
  } else {
    return '精通';
  }
};

// 处理出时间戳
function getTs(time: any) {
  const arr = time.split(/[- :]/);
  const _date: any = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  const timeStr = Date.parse(_date);
  return timeStr;
}
// 时间处理函数 => 几天前、刚刚
export const showtime = (post_modified: any) => {
  // 计算 当前时间 和 发布时间 的时间差
  const curTime = new Date();
  const timeDiff = curTime.getTime() - getTs(post_modified);

  // 单位换算 -> ms
  const min = 60 * 1000;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = week * 4;
  const year = month * 12;

  // 计算发布时间距离当前时间的周、天、时、分
  const exceedyear = Math.floor(timeDiff / year);
  const exceedmonth = Math.floor(timeDiff / month);
  const exceedWeek = Math.floor(timeDiff / week);
  const exceedDay = Math.floor(timeDiff / day);
  const exceedHour = Math.floor(timeDiff / hour);
  const exceedMin = Math.floor(timeDiff / min);

  // 判断时间差属于哪个区间

  if (exceedyear < 100 && exceedyear > 0) {
    return '发表于' + exceedyear + '年前';
  } else {
    if (exceedmonth < 12 && exceedmonth > 0) {
      return exceedmonth + '月前';
    } else {
      if (exceedWeek < 4 && exceedWeek > 0) {
        return exceedWeek + '周前';
      } else {
        if (exceedDay < 7 && exceedDay > 0) {
          return exceedDay + '天前';
        } else {
          if (exceedHour < 24 && exceedHour > 0) {
            return exceedHour + '小时前';
          } else {
            if (exceedMin == 0) {
              return '刚刚发表';
            } else {
              return exceedMin + '分钟前';
            }
          }
        }
      }
    }
  }
};

// 获取简历背景小图片资源
export const getAssetsResumeBgcFile = (url: string) => {
  return new URL(`../assets/images/resumeBackground/${url}`, import.meta.url).href;
};

// 获取文件大小
export const getFileSize = (fileByte: number) => {
  const fileSizeByte = fileByte;
  let fileSizeMsg = '';

  if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB';
  else if (fileSizeByte === 1048576) fileSizeMsg = '1MB';
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
    fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB';
  else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = '1GB';
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
    fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  else fileSizeMsg = '文件大小超过1TB';

  return fileSizeMsg;
};

// 根据链接下载文件
export const downloadFileUtil = (url: string) => {
  const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  if (isChrome || isSafari) {
    const link = document.createElement('a');
    link.href = url;
    if (link.download !== undefined) {
      // 如果有定义的下载download，则截取正确的文件名 例如: images/test.png ==> test.png
      const fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
      link.download = fileName;
    }
    if (document.createEvent) {
      const e = document.createEvent('MouseEvent');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }
  window.open(url, '_self');
  return true;
};
