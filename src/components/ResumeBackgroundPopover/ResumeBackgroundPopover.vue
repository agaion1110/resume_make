<template>
  <el-popover placement="left" :width="350" trigger="click">
    <template #reference>
      <div class="background-img-box">
        <div v-if="!resumeJsonNewStore.GLOBAL_STYLE.resumeBackgroundCom" class="default-img">
          <div class="default-img-pop">默认背景</div>
        </div>
        <div v-else class="bgc-img">
          <img :src="getAssetsResumeBgcFile(
            resumeBackgroundList[resumeJsonNewStore.GLOBAL_STYLE.resumeBackgroundCom].url
          )
            " alt="背景图选择" srcset="" />
        </div>
      </div>
    </template>
    <!-- 内容区域 -->
    <div class="custom-background-shape-box">
      <!-- 背景列表 -->
      <div class="item-box" @click="handleResumeBackground()">
        <div class="default-img-pop">默认背景</div>
      </div>
      <div v-for="(value, key, index) of resumeBackgroundList" :key="index" class="item-box"
        @click="handleResumeBackground(key)">
        <img :src="getAssetsResumeBgcFile(value.url)" alt="背景图选择" srcset="" />
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
import appStore from '@/store';
import { storeToRefs } from 'pinia';
import resumeBackgroundList from '@/dictionary/resumeBackgroundDic';
import { getAssetsResumeBgcFile } from '@/utils/common';

// store相关数据
const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);

// 选择背景
const handleResumeBackground = (key?: string | number ) => {
  resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom = key;
}
</script>
<style lang="scss" scoped>
.background-img-box {
  cursor: pointer;

  .default-img {
    width: 80px;
    height: 100px;
    background: #c6ffdd;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right,
        #f7797d,
        #fbd786,
        #c6ffdd);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right,
        #f7797d,
        #fbd786,
        #c6ffdd);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    .default-img-pop{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .bgc-img {
    img {
      width: 100px;
      height: 120px;
      box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;
    }
  }
}

.custom-background-shape-box {
  display: flex;
  justify-content: space-between;

  .item-box {
    width: 100px;
    height: 120px;
    box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      box-shadow: rgba(99, 100, 99, 0.4) 0px 0px 10px;
    }

    .default-img-pop {
      width: 100%;
      height: 100%;
      cursor: pointer;
      box-shadow: #63646366 0 0 10px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      color: green;
    }
  }
}
</style>
