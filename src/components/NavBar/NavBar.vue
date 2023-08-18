<template>
  <div class="nav-bar-box">
    <!-- logo -->
    <logo-com
      :font-color="fontColor ? fontColor : '#fff'"
      :icon-color="iconColor ? iconColor : '#fff'"
    ></logo-com>
    <div class="center">
      <el-menu
        :default-active="route.name as string"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <template v-for="(item, index) in menuList" :key="index">
          <template v-if="item.children">
            <el-sub-menu
              :index="item.name"
              popper-class="navbar-popper-box"
              :show-timeout="0"
              :hide-timeout="100"
            >
              <template #title>{{ item.title }}</template>
              <el-menu-item
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :index="childItem.name"
              >
                {{ childItem.title }}
              </el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.name">{{ item.title }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <!-- Github -->
    <div class="right">
      <!-- 登录注册以及用户展示区域 -->
      <div class="user-box">
        <div v-if="false" class="logon-register-box">
          <el-button class="register-btn" @click="openRegisterDialog">注册</el-button>
          <el-button class="login-btn" type="primary" @click="openLoginDialog">登录</el-button>
        </div>
        <div v-else class="user-avatar-box">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                v-if="false"
                :size="45"
                src=""
              ></el-avatar>
              <el-avatar v-else :size="45">
                <!-- {{ appStore.useUserInfoStore.userInfo.name.split('')[0] }} -->
                name
              </el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="toProfile">个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import appStore from '@/store';
  // import LoginDialog from '@/components/LoginDialog/LoginDialog';

  interface IBgcColor {
    fontColor?: string;
    bgColor?: string;
    iconColor?: string;
    position?: string;
  }
  const route = useRoute();
  const props = withDefaults(defineProps<IBgcColor>(), {
    fontColor: '',
    bgColor: '',
    iconColor: '#fff',
    position: 'fixed'
  });
  const router = useRouter();

  // 菜单项
  const menuList = reactive([
    {
      iconfont: '',
      name: 'Template',
      title: '在线制作',
      path: '/template',
      chlidren: null
    },
    {
      iconfont: '',
      name: 'TemplateDownload',
      title: '模板下载',
      children: [
        {
          iconfont: '',
          name: 'Word',
          title: '简历模板',
          children: null,
          path: '/word'
        },
        {
          iconfont: '',
          name: 'PPT',
          title: 'PPT模板',
          children: null,
          path: '/ppt'
        }
      ]
    },
    {
      iconfont: '',
      name: 'Resourceshare',
      title: '资源分享',
      children: [
        {
          iconfont: '',
          name: 'Soft',
          title: '软件分享',
          children: null,
          path: '/soft'
        }
      ]
    },
    {
      iconfont: '',
      name: 'OnlineTool',
      title: '在线工具',
      children: [
        {
          iconfont: '',
          name: 'ImgCompress',
          title: '图片压缩',
          children: null,
          path: '/imgCompress'
        }
      ]
    }
  ]);
  // 菜单
  const currentMenu = ref<string>('');
  const handleSelect = (key: string) => {
    currentMenu.value = key;
    router.push({
      name: key
    });
    console.log(currentMenu.value);
  };
  const nameColor = computed(() => {
    return props.fontColor ? '#2ddd9d' : 'green';
  });
  // 打开注册弹窗
  const openRegisterDialog = () => {
    // LoginDialog(false);
  };
  // 打开登录弹窗
  const openLoginDialog = () => {
    // LoginDialog(true);
  };
  // 跳转至个人中心
  const toProfile = () => {
    router.push('/person');
  };
  // const { saveToken } = appStore.useTokenStore;
  // const { saveUserInfo } = appStore.useUserInfoStore;
  // const { setUuid } = appStore.useRefreshStore;
  // 退出登录
  const logout = () => {
    // saveToken(''); //  清除token
    // saveUserInfo(''); //  清除用户信息
    // setUuid(); //  全局刷新
    router.push('/'); //  返回首页
  };
</script>

<style lang="scss" scoped>
  .nav-bar-box {
    display: flex;
    height: 70px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background-color: v-bind('bgColor');
    z-index: 10;
    user-select: none;
    padding: 0 60px;
    position: v-bind('props.position');
    top: 0;
    transition: all 0.3s;
    .center {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-menu {
        border: none;
        height: 100%;
        background-color: rgba(255, 255, 255, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        .el-menu-item {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          color: v-bind('fontColor');
          padding: 0 15px !important;
          letter-spacing: 3px;
          font-size: 16px;
          border-bottom: 4px solid transparent;
          transition: all 0.3s;
          &:hover {
            // color: #2ddd9d;
            border-color: #2ddd9d;
            background-color: rgba(#ccc, 0.1);
          }
        }
        .el-sub-menu {
          height: 100%;
          color: v-bind('fontColor');
          border-bottom: 4px solid transparent;
          &:hover {
            border-bottom: 4px solid #2ddd9d !important;
            background-color: rgba(#ccc, 0.1);
          }
          :deep(.el-sub-menu__title) {
            letter-spacing: 3px;
            font-size: 16px;
            color: v-bind('fontColor');
            border: none;
            &:hover {
              background-color: rgba(#ccc, 0.1);
            }
          }
        }
        .is-active {
          background-color: rgba(255, 255, 255, 0);
          // color: #21a474;
          border-bottom: 4px solid #2ddd9d !important;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .contact-me {
        cursor: pointer;
        margin-right: 15px;
        font-size: 14px;
        color: v-bind('iconColor');
      }
      .svg-icon {
        cursor: pointer;
      }
      .user-box {
        display: flex;
        .logon-register-box {
          display: flex;
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            width: 65px;
          }
          .register-btn {
            margin-left: 15px;
          }
          .login-btn {
          }
        }
        .user-avatar-box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 15px;
          .name-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: v-bind('nameColor');
            background-color: v-bind('iconColor');
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .navbar-popper-box {
    overflow: hidden;
    border: none;
    border-radius: 0;
    .el-menu {
      padding: 0;
      min-width: 134px;
      .el-menu-item {
        height: 50px;
        font-size: 14px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 2px;
      }
    }
  }
</style>
