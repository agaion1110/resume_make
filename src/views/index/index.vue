<template>
  <div>
    <nav-bar :bg-color="navColor" :font-color="fontColor" :icon-color="iconColor"></nav-bar>
    <!-- 项目介绍栏 -->
    <div ref="introduceRef">
      <project-introduce
      ></project-introduce>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectIntroduce from './components/ProjectIntroduce.vue';
  const navColor = ref<string>('');
  const fontColor = ref<string>('#fff');
  const iconColor = ref<string>('#fff');
</script>

<style scoped>

</style>