<template>
  <div class="main-right-box">
    <Title :title="appStore.useSelectMaterialStore.cptTitle"></Title>
    <c-scrollbar trigger="hover">
      <div class="options-box">
        <component
          :is="optionsComponents[appStore.useSelectMaterialStore.cptOptionsName]"
          v-if="appStore.useSelectMaterialStore.cptOptionsName"
          :key="appStore.useSelectMaterialStore.cptKeyId"
        ></component>
        <GlobalStyleOptionsVue v-else></GlobalStyleOptionsVue>
      </div>
    </c-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import Title from './Title.vue';
  import appStore from '@/store';
  import GlobalStyleOptionsVue from '@/options/GlobalStyleOptions.vue';
  import optionsComponents from '@/utils/registerMaterialOptionsCom';
</script>

<style lang="scss">
  @import '../../../style/options.scss';
  .main-right-box {
    width: 355px;
    background-color: #fff;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
  }
</style>
