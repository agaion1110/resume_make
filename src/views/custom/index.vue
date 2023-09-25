<template>
  <div class="custom-resume-box">
    66666
    <!-- 导航栏 -->
    <NavCom @generate-report="generateReport"></NavCom>
    <!-- 主区域 -->
    <div class="main-box">
      <!-- 左侧物料区 -->
      <MainLeft></MainLeft>
      <!-- 中间设计区 -->
      <MainCenter ref="mainCenterRef" :components="MaterialComponents"></MainCenter>
      <!-- 右侧属性面板 -->
      <MainRight></MainRight>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavCom from './components/NavCom.vue';
  import MainLeft from './components/MainLeft.vue';
  import MainCenter from './components/MainCenter.vue';
  import MainRight from './components/MainRight.vue';
  import MaterialComponents from '@/utils/registerMaterialCom'; // 所有物料组件

  // 打印为PDF
  const mainCenterRef = ref<any>(null);
  const generateReport = () => {
    mainCenterRef.value.generateReport();
  };
</script>

<style lang="scss" scoped>
  .custom-resume-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main-box {
      flex: 1;
      display: flex;
      box-sizing: border-box;
    }
  }
</style>
