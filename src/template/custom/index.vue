<template>
  <div class="content-box" ref="customContentPdf">
    <!-- 无布局模式 -->
    <template v-if="resumeJsonNewStore.LAYOUT === 'custom'">
      <div class="upload-json-box" @click="importJson">
        <svg-icon icon-name="icon-daimashili" color="#74a274" size="28px"></svg-icon>
        <h1>请导入JSON文件</h1>
        <p>该JSON文件通常为自定义模板时导出的JSON文件</p>
      </div>
    </template>
    <!-- 传统布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'classical'">
      <draggable class="dragArea list-group" :list="resumeJsonNewStore.COMPONENTS" animation="500" group="custom"
        :sort="true" item-key="id">
        <template #item="{ element }">
          <div class="list-group-item">
            <ModelBox :item="element" :components="MaterialComponents"></ModelBox>
          </div>
        </template>
      </draggable>
    </template>
    <!-- 左右两列布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'leftRight'">
      <div class="left-box">
        <draggable class="left-drag-area" :list="leftList" animation="500" group="custom" :sort="true" item-key="id">
          <template #item="{ element }">
            <div class="list-group-item">
              <model-box :components="MaterialComponents" :item="element" @left-right-add="leftAdd"
                @left-right-delete="leftDelete"></model-box>
            </div>
          </template>
        </draggable>
      </div>
      <div class="right-box">
        <draggable class="right-drag-area" :list="rightList" animation="500" group="custom" :sort="true" item-key="id">
          <template #item="{ element }">
            <div class="list-group-item">
              <model-box :components="MaterialComponents" :item="element" @left-right-add="rightAdd"
                @left-right-delete="rightDelte"></model-box>
            </div>
          </template>
        </draggable>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import appStore from '@/store';
import MaterialComponents from '@/utils/registerMaterialCom'; // 所有物料组件
import { IMATERIALITEM } from '@/interface/material';
import { cloneDeep } from 'lodash';
import { getUuid } from '@/utils/common';
import ModelBox from './ModelBox.vue';
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

/**
 * 左右两侧布局
 */
const leftList = ref<any>([]);
const rightList = ref<any>([]);
if (resumeJsonNewStore.LAYOUT === 'leftRight') {
  leftList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'left');
  rightList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'right');
}
watch(
  () => leftList.value,
  (val) => {
    leftList.value.forEach((item: IMATERIALITEM) => {
      item.layout = 'left';
    });
    resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
  },
  {
    deep: true
  }
)
watch(
  () => rightList.value,
  (val) => {
    rightList.value.forEach((item: IMATERIALITEM) => {
      item.layout = 'right';
    });
    resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
  },
  {
    deep: true
  }
)

// 左侧模块复制
const leftAdd = (modelItem: IMATERIALITEM) => {
  //  需要复制的模块的索引
  let index: number = leftList.value.findIndex(
    (item: IMATERIALITEM) => item.keyId === modelItem.keyId
  );
  let insert = cloneDeep(modelItem);
  insert.keyId = getUuid();
  leftList.value.splice(index, 0, insert);
  resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
};
// 右侧模块复制
const rightAdd = (modelItem: IMATERIALITEM) => {
  let index: number = rightList.value.findIndex(
    (item: IMATERIALITEM) => item.keyId === modelItem.keyId
  );
  let insert = cloneDeep(modelItem);
  insert.keyId = getUuid();
  rightList.value.splice(index, 0, insert);
  resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
};

// 左侧模块删除
const leftDelete = (modelItem: IMATERIALITEM) => {
  let index: number = leftList.value.findIndex(
    (item: IMATERIALITEM) => item.keyId === modelItem.keyId
  );
  let sum: number = 0; //  相同模块个数
  resumeJsonNewStore.COMPONENTS.forEach((item) => {
    if (item.model === modelItem.model) {
      sum++;
    }
  });
  if (sum > 1) {
    leftList.value.splice(index, 1);
  } else {
    leftList.value[index].show = false;
  }
};
// 右侧模块删除
const rightDelte = (modelItem: IMATERIALITEM) => {
  let index: number = rightList.value.findIndex(
    (item: IMATERIALITEM) => item.keyId === modelItem.keyId
  );

  let sum: number = 0; //  相同模块个数
  resumeJsonNewStore.COMPONENTS.forEach((item) => {
    if (item.model === modelItem.model) {
      sum++;
    }
  });
  if (sum > 1) {
    rightList.value.splice(index, 1);
  } else {
    rightList.value[index].show = false;
  }
};
defineExpose({
  leftList,
  rightList
});
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
}
</style>