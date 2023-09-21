import appStore from '@/store/index';
import { getPNGAsync, getResumePdfAsync } from '@/http/api/resume';
import CONFIG from '@/config/index';

// 生成pdf
export const exportPdf = async (token?: string, id?: string, height?: string) => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const fileName = resumeJsonNewStore.TITLE;
  const params = {
    url: `${CONFIG.serverAddress}/pdfPreview?token=${token}&&id=${id}&&height=${height}`,
    printBackground: true,
    timezone: '',
    margin: '',
    filename: '',
    format: 'A4'
  };
  const pdfData = await getResumePdfAsync(params);
  if (pdfData.status) {
    ElMessage.warning('下载失败，请尝试重新导出');
    return;
  } else {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //  创建下载链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.pdf`; //  自定义下载后的文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //  出发点击，开始下载
    document.body.removeChild(downloadElement); //  下载完成后移除元素
    window.URL.revokeObjectURL(href); //  释放blob对象
  }
};

// 生成png方法
export const exportPNG = async (token?: string, id?: string, height?: string) => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const fileName = resumeJsonNewStore.TITLE;
  const params = {
    url: `${CONFIG.serverAddress}/pdfPreview?token=${token}&&id=${id}&&height=${height}`,
    format: 'A4'
  };
  const pngData = await getPNGAsync(params);
  if (pngData.status) {
    ElMessage.warning('下载失败，请尝试重新导出');
    return;
  } else {
    const blob = new Blob([pngData], { type: 'application/image' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.png`; //下载后的文件名，根据需求定义
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
};

// 获得pdf的url
export const getPdfUrl = (token?: string, id?: string, height?: string) => {
  return `${CONFIG.serverAddress}/pdfPreview?token=${token}&&id=${id}&&height=${height}`;
};
