<template>
  <nav-bar v-if="route.meta.isShowComNav" :key="refreshUuid" bg-color="#fff" font-color="green" position="sticky"
    icon-color="green">
  </nav-bar>
  <router-view v-show="!isLoading" v-slot="{ }" :key="refreshUuid"></router-view>
  <!-- 加载动画 -->
  <loading-com-vue v-show="isLoading"></loading-com-vue>
</template>

<script setup lang="ts">
import appStore from './store';
import LoadingComVue from '@/components/Loading/LoadingCom.vue'; // 全局等待层
import { storeToRefs } from 'pinia';
const { isLoading } = storeToRefs(appStore.useLoadingStore);
const { refreshUuid } = appStore.useRefreshStore;
const route = useRoute();
// 查询和更新用户信息
const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
const { token } = appStore.useTokenStore;
if (token) {
  getAndUpdateUserInfo();
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
