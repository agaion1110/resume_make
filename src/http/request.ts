import Request from "./index";
import CONFIG from "@/config";
import appStore from "@/store";
import {RequestConfig} from "./types/types";
import { AxiosResponse } from "axios";

// 创建一个axios实例
const http = new Request({
  baseURL: CONFIG.serverAddress,
  timeout: CONFIG.maxTimeout,
  interceptors: {
    requestInterceptor: config => {
      config.validateStatus = status => {
        switch (status) {
          case 401:
            ElMessage.error('用户信息过期或无权限，请重新登录');
            const { saveToken } = appStore.useTokenStore;
            const { saveUserInfo } = appStore.useUserInfoStore;
            const { setUuid } = appStore.useRefreshStore;
            const router = useRouter();
            saveToken(''); //  清除token
            saveUserInfo(''); //  清除用户信息
            setUuid(); //  全局刷新
            router.push('/');
            break;
          default:
            break;
        }
        return status >= 200 && status < 300; // 默认200-300为成功
      };
      return config;
    },
    responseInterceptor: result => { 
      return result;
    }
  }
})
export default http;