<template>
  <div class="online-preview-box">
    <!-- 简历 -->
    <div class="design" ref="html2Pdf" :key="refreshUuid">
      <div class="design-content" ref="htmlContentPdf">
        <ResumePreviewCom @content-height-change="contentHeightChange"></ResumePreviewCom>
      </div>

      <!-- 分页线 -->
      <template v-if="linesNumber > 0">
        <div
          v-for="(item, index) in linesNumber"
          :key="index"
          class="lines"
          :ref="(el) => setLinesRef(el, index)"
          :style="{ top: `${1158 + 1160 * index}px` }"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ResumePreviewCom from './compoents/ResumePreviewCom.vue';
  import appStore from '@/store/index';
  import { storeToRefs } from 'pinia';

  const { refreshUuid } = storeToRefs(appStore.useRefreshStore);
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); //  获得store中的模板数据

  // 监听元素高度变化->绘制分割线
  const htmlContentPdf = ref<any>(null);
  const html2Pdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  let linesNumber = ref<number>(0);
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.ceil(height / 1160); //  计算分割线数目
        html2Pdf.value.style.height = 1160 * linesNumber.value + 'px'; //  计算整个简历的高度
        htmlContentPdf.value.style.height = html2Pdf.value.style.height;
      }
    });
    observer.observe(htmlContentPdf.value); //  监听元素
  };

  // 子组件内容高度发生变化-->需要重新计算高度，触发resizeDOM
  const contentHeightChange = async (height: number) => {
    htmlContentPdf.value.style.height = height + 'px';
    await nextTick();
    resizeDOM();
  };

  // 分页线的模块ref
  const lineRefs: Array<any> = [];
  const setLinesRef = (el: any, index: number) => {
    if (el) {
      if (linesNumber.value === index + 1) {
        // 最后一条分页线出现在底部
        el.style.top = linesNumber.value * 1160 + 'px';
      }
      lineRefs.push(el);
    }
  };
</script>

<style lang="scss" scoped>
  .online-preview-box {
    padding: 0 0 30px 0;
    .design {
      background: white;
      width: 820px;
      min-height: 1160px;
      display: flex;
      position: relative;
      margin: 0 auto;
      border-radius: 5px;
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 10%);
      .design-content {
        font-family: v-bind(
          'resumeJsonNewStore.GLOBAL_STYLE.fontFamily ? resumeJsonNewStore.GLOBAL_STYLE.fontFamily : "微软雅黑"'
        );
      }

      .lines {
        z-index: 10;
        width: 820px;
        height: 4px;
        background: rgba(0, 0, 0, 0.5);
        user-select: none;
        pointer-events: none;
        position: absolute;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
