import router from '@/router';
import { createApp } from 'vue';
import LoginDialogVue from './LoginDialog.vue';

const createDialog = (isLogin = false, to?: string) => {
  const mountNode = document.createElement('div');
  const Instance = createApp(LoginDialogVue, {
    isLogin: isLogin,
    cancel: () => {
      Instance.unmount();
      document.body.removeChild(mountNode);
    },
    confirm: () => {
      if (to) {
        router.push(to);
      }
      Instance.unmount();
      document.body.removeChild(mountNode);
    }
  });
  document.body.appendChild(mountNode);
  Instance.use(router);
  Instance.mount(mountNode);
};

export default createDialog;
