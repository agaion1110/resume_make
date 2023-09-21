<template>
  <div>
    <nav-bar :bg-color="navColor" :font-color="fontColor" :icon-color="iconColor"></nav-bar>
    <!-- 项目介绍栏 -->
    <div ref="introduceRef">
      <project-introduce @free-make="freeMake" @custom-template="customTemple" @sponsor="sponsor"></project-introduce>
    </div>

    <!-- 简历模板展示 -->
    <template-select ref="templateRef"></template-select>

    <!-- 自定义模板展示 -->
    <custom-template ref="customTemplateRef"></custom-template>

    <!-- 成为赞助者 -->
    <SponsorCom ref="sponsorRefs"></SponsorCom>

    <!-- 网站相关数据 -->
    <WebData></WebData>

    <!-- footer -->
    <FooterCom></FooterCom>
  </div>
</template>

<script setup lang="ts">
import { throttle } from 'lodash';
import ProjectIntroduce from './components/ProjectIntroduce.vue';
import TemplateSelect from './components/TemplateSelect.vue';
import CustomTemplate from './components/CustomTemplate.vue';
import SponsorCom from './components/SponsorCom.vue';
import WebData from './components/WebData.vue';
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
    navColor.value = '';
    fontColor.value = 'green';
    iconColor.value = 'green';
  } else {
    navColor.value = '';
    fontColor.value = '#fff';
    iconColor.value = '#fff';
  }
}
// 点击免费制作
const templateRef = ref<any>(null);
const freeMake = () => {
  templateRef.value.scrollIntoView();
};
// 点击自定义模板
const customTemplateRef = ref<any>(null);
const customTemple = () => {
  customTemplateRef.value.scrollIntoView();
};
// 点击成为赞助者
const sponsorRefs = ref<any>(null);
const sponsor = () => {
  sponsorRefs.value.scrollIntoView();
};

</script>

<style scoped></style>