<template>
  <div>
    <nav-bar :bg-color="navColor" :font-color="fontColor" :icon-color="iconColor"></nav-bar>
    <!-- 项目介绍栏 -->
    <div ref="introduceRef">
      <project-introduce></project-introduce>
    </div>

    <!-- 简历模板展示 -->
    <template-select ref="templateRef"></template-select>
  </div>
</template>

<script setup lang="ts">
import { throttle } from 'lodash';
import ProjectIntroduce from './components/ProjectIntroduce.vue';
import TemplateSelect from './components/TemplateSelect.vue';
const navColor = ref<string>('');
const fontColor = ref<string>('#fff');
const iconColor = ref<string>('#fff');

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', throttleHandle);
})
// 卸载监听事件
onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleHandle);
});
// 滚动时间添加节流函数
const throttleHandle = throttle(() => {
  handleScroll();
}, 300);
// 滚动事件
const handleScroll = () => {
  if (document.documentElement.scrollTop > 0) {
    navColor.value = '#fff';
    fontColor.value = 'green';
    iconColor.value = 'green';
  } else {
    navColor.value = '';
    fontColor.value = '#fff';
    iconColor.value = '#fff';
  }
}
</script>

<style scoped></style>