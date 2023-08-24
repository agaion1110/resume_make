// 模块样式
interface IMODELSTYLE {
  themeColor: string; // 主题色
  firstTitleFontSize: string; // 一级标题
  textColor: string;
  textFontSize: string;
  textFontWeight: number;
  titleColor: string;//标题颜色
  titleFontSize: string;//标题大小
  titleFontWeight: number;//标题字体宽度
  backgroundColor: string;//背景颜色
  pLeftRight: string; // 左右内边距
  pTop: string; // 上内边距
  pBottom: string; // 下内边距
  mBottom: string;//下外边距
  mTop: string;//上外边距
}
export default IMODELSTYLE;
