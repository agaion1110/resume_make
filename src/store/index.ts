import { useUserInfoStore } from "./userInfo";

export interface IAppStore {
    useUserInfoStore: ReturnType<typeof useUserInfoStore>;
    useTokenStore: ReturnType<typeof useTokenStore>;
    useRefreshStore: ReturnType<typeof useRefreshStore>;
}
const appStore: IAppStore = {} as IAppStore;

/**
 * @description 注册状态库
 * @author Aurora
 * @date 2023/08/18
 */
export const registerStore = () => {
    appStore.useUserInfoStore = useUserInfoStore();
};

export default appStore;