<template>
  <div class="right-content-box">
    <!-- 菜单标题 -->
    <ContentTitle v-if="route.meta.showTitle" :title="(route.meta.title as string)"></ContentTitle>
    <div class="router-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ContentTitle from './ContentTitle.vue';

  const route = useRoute();
</script>

<style lang="scss" scoped>
  .right-content-box {
    flex: 1;
    min-height: 300px;
    margin: 270px 0 0px 30px;
    box-sizing: border-box;
    .router-box {
      padding: 0 0 20px 0;
    }
  }
</style>
