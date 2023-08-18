export interface IAppStore {
    useUserInfoStore: ReturnType<typeof useUserInfoStore>;
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