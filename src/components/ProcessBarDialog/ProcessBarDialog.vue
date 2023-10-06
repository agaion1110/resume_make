<template>
  <el-dialog
    :model-value="dialogVisible"
    width="40%"
    :show-close="false"
    :close-on-click-modal="false"
    class="pdf-progress"
    append-to-body
    destroy-on-close
  >
    <template #header>
      <div class="header">
        <h1>{{ statusText }}</h1>
      </div>
    </template>
    <div class="download-status">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="percentageNum"></el-progress>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const emit = defineEmits(['cancel']);
  interface IDialog {
    dialogVisible: boolean;
    percentageNum: number;
  }
  const props = withDefaults(defineProps<IDialog>(), {
    dialogVisible: false,
    percentageNum: 1
  });
  
  const statusText = ref<string>('下载中');
  watch(
    () => props.percentageNum,
    (newVal) => {
      if (newVal === 100) {
        statusText.value = '下载完成';
      }else{
        statusText.value = '下载中';
      }
    },
    {
      deep: true
    }
  );

  const cancel = () => {
    emit('cancel');
  };
</script>

<style lang="scss">
  .pdf-progress {
    .header {
      h1 {
        font-size: 20px;
      }
    }
  }
</style>
