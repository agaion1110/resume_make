<template>
  <nav-bar v-if="route.meta.isShowComNav" :key="refreshUuid" bg-color="#fff" font-color="green" position="sticky"
    icon-color="green">
  </nav-bar>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { throttle } from 'lodash';
import appStore from './store';
// 
const { refreshUuid } = appStore.useRefreshStore;
// 获取当前页面路由
const route = useRoute();
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
