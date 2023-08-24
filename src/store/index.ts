import { useLoadingStore } from './loading';
import { useTokenStore } from './token';
import { userRefreshStore } from './refresh';
import { useUserInfoStore } from './user';
import {useResumeJsonNewStore, useSelectMaterialStore } from './resume';


export interface IAppStore {
  useUserInfoStore: ReturnType<typeof useUserInfoStore>;
  useTokenStore: ReturnType<typeof useTokenStore>;
  useRefreshStore: ReturnType<typeof userRefreshStore>;
  useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>;
  useLoadingStore: ReturnType<typeof useLoadingStore>;
  useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>;
}
const appStore: IAppStore = {} as IAppStore;
/**
 * @description 注册app状态库
 * @author Aurora
 * @date 2023/03/16 20:50:52
 */
export const registerStore = () => {
  appStore.useUserInfoStore = useUserInfoStore();
  appStore.useTokenStore = useTokenStore();
  appStore.useRefreshStore = userRefreshStore();
  appStore.useLoadingStore = useLoadingStore();
  appStore.useResumeJsonNewStore = useResumeJsonNewStore();
  appStore.useSelectMaterialStore = useSelectMaterialStore();
};

export default appStore;
