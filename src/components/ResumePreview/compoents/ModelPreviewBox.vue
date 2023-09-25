<template>
  <div v-if="item.show" :ref="(el) => setItemRef(el, item.keyId)" class="material-model-box">
    <component
      :is="components[item.cptName]"
      :class="['model-item']"
      :model-data="item.data"
      :model-style="item.style"
      :style="getDynamicStyle(item)"
    ></component>
  </div>
</template>

<script setup lang="ts">
  import { IMATERIALITEM } from '@/interface/material';
  import { storeToRefs } from 'pinia';
  import { ComponentPublicInstance } from 'vue';
  import appStore from '@/store/index';

  defineProps<{
    item: IMATERIALITEM;
    components: any;
  }>();

  // 锚点定位
  const { cptKeyId } = storeToRefs(appStore.useSelectMaterialStore); //  选中的模块Id
  watch(
    () => cptKeyId.value,
    (newVal, oldVal) => {
      // 判断是否选中复选框
      if (oldVal && modelObj[oldVal]) {
        modelObj[oldVal].el.style.borderColor = 'transparent';
      }
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' });  //  出现在可视区域
        modelObj[newVal].el.style.borderColor = '#7ec97e';
      }
    },
    {
      deep: true
    }
  );

  // 模块ref
  const modelObj = reactive<any>({});
  const setItemRef = (el: ComponentPublicInstance | null | Element, keyId: string) => {
    if (el) {
      modelObj[keyId] = {
        el: el,
        id: keyId
      };
    }
  };

  // 添加样式
  const getDynamicStyle = (item: IMATERIALITEM) => {
    return {
      width: item.cptWidth
    };
  };
</script>

<style lang="scss" scoped>
  .material-model-box {
    border: 1px dashed transparent;
    transition: all 0.3s;
    position: relative;
    .model-item {
      border: 1px dashed transparent;
      position: relative;
      box-sizing: border-box;
    }
  }
</style>
