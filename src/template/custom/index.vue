<template>
  <div class="content-bx" ref="customContentPdf">
    <!-- 无布局模式 -->
    <template v-if="resumeJsonNewStore.LAYOUT === 'custom'">
      <div class="upload-json-box" @click="importJson">
        <svg-icon icon-name="icon-daimashili" color="#74a274" size="28px"></svg-icon>
        <h1>请导入JSON文件</h1>
        <p>该JSON文件通常为自定义模板时导出的JSON文件</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import appStore from '@/store';
const emit = defineEmits(['contentHeightChange']);
let { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
// 监听内容高度发生变化
let customContentPdf = ref<any>(null);


// 上传JSON弹窗
const dialogVisible = ref<boolean>(false);
const importJson = () => {
  dialogVisible.value = true;
}
// 关闭上传JSON弹窗
const cancelJsonDialog = () => {
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
@import '../../style/options.scss';

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

  // 导入json
  .upload-json-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    padding: 0 10px;
    background-color: antiquewhite;
    cursor: pointer;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #74a274;
    user-select: none;

    &:hover {
      background-color: rgba(antiquewhite, 0.5);
      transition: all 0.3s;
    }

    h1 {
      margin: 10px 0;
      font-size: 20px;
    }

    p {
      margin-top: 10px;
      opacity: 0.9;
      font-size: 12px;
    }
  }
}</style>