<template>
  <div class="content-box" ref="customContentPdf">
    <!-- 传统(默认)布局 -->
    <template v-if="resumeJsonNewStore.LAYOUT === 'classical'">
      <div v-for="(element, index) in resumeJsonNewStore.COMPONENTS" :key="index" class="list-group-item">
        <ModelPreviewBoxVue :components="MaterialComponents" :item="element"></ModelPreviewBoxVue>
      </div>
    </template>
    <!-- 左右两列布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'leftRight'">
      <div class="left-box">
        <div v-for="(element, index) in leftList" :key="index" class="list-group-item">
          <ModelPreviewBoxVue :components="MaterialComponents" :item="element"></ModelPreviewBoxVue>
        </div>
      </div>
      <div class="right-box">
        <div v-for="(element, index) in rightList" :key="index" class="list-group-item">
          <ModelPreviewBoxVue :components="MaterialComponents" :item="element"></ModelPreviewBoxVue>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import appStore from '@/store';
import ModelPreviewBoxVue from './ModelPreviewBox.vue';
import MaterialComponents from '@/utils/registerMaterialCom'; //  所有物料组件

defineOptions({ name: 'onlinePreview' });
const emit = defineEmits(['contentHeightChange']);
onMounted(() => {
  heightChange();
});
const { resumeJsonNewStore } = appStore.useResumeJsonNewStore; //  获得store相关数据
const leftList = ref<any>([]);
const rightList = ref<any>([]);
if (resumeJsonNewStore.LAYOUT === 'leftRight') {
  leftList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'left');
  rightList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'right');
}

// 监听内容高度变化
const customContentPdf = ref<any>(null);
let observer: ResizeObserver | null = null;
let height = 0;
const heightChange = () => {
  observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      height = (entry.target as HTMLElement).offsetHeight;
      emit('contentHeightChange', height);
    }
  });
  observer.observe(customContentPdf.value); //  监听元素
};
</script>

<style lang="scss" scoped>
.content-box {

  // position: relative;
  .dragArea {
    min-width: 820px;
    min-height: 300px;
    width: 820px;
    min-height: 1160px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    z-index: 0;
  }

  .left-box {
    width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
    box-sizing: border-box;
    background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftThemeColor');
    min-height: 1160px;
    position: absolute;
    height: 100%;

    .left-drag-area {
      min-height: 1160px;
      width: 100%;
    }
  }

  .right-box {
    min-height: 1160px;
    width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightWidth');
    margin-left: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
    background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightThemeColor');

    .right-drag-area {
      min-height: 1160px;
      width: 100%;
    }
  }
}
</style>
