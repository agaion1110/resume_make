import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/style/normalize.css";
// import component from "@/utils/registerCom";
// 注册所有图标
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import elementIcons from "@/components/SvgIcon/svgicon";
// 颜色选择控件
// import ColorPicker from "colorpicker-v3"; //  注册组件
import "colorpicker-v3/style.css"; //  引入样式文件
// 图标
import "@/assets/iconfont/iconfont.js";
// 字体文件
import "@/assets/font/font.css";
// 滚动条组件
import CScrollbar from "c-scrollbar";
// element-plus部分组件样式
import "element-plus/theme-chalk/src/message.scss";
// 注册store
import { createPinia } from "pinia";
// import { registerStore } from "@/store";
// 图片预览工具
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

import "default-passive-events";
// 使用vue-dompurify-html代替v-html，解决可能带来的XSS攻击
import VueDOMPurifyHTML from "vue-dompurify-html";

// 注册UndrawUi组件 gitee地址: https://gitee.com/undraw/undraw-ui
// import UndrawUi from "./components/packages/index";
// 文章样式
import "@/style/article/github-markdown-light.css";

// import { userAgent } from "./utils/userAgent";
// userAgent();
const app = createApp(App);

app.use(createPinia());
// 注册pinia状态管理库
// registerStore();

app.use(router);
// app.use(component);
app.use(elementIcons);
app.use(VueDOMPurifyHTML);
// app.use(ColorPicker);
app.use(CScrollbar);
app.use(VueViewer, {
  defaultOptions: {
    // 自定义默认配置
  },
});
app.component("SvgIcon", SvgIcon);
// app.use(UndrawUi);
// 挂载实例
app.mount("#app");
