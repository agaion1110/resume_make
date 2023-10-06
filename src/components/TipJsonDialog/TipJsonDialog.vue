<template>
  <!-- 提示弹窗 -->
  <el-dialog
    :model-value="tipDialogVisible"
    width="40%"
    title="示例JSON"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    class="import-json"
  >
    <!-- 代码编辑器 -->
    <div class="code-mirror-box">
      <codemirror
        ref="codemirrorRef"
        v-model="code"
        placeholder="请将你的简历JSON写在此处O.o"
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        :disabled="true"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="close">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { Codemirror } from 'vue-codemirror';
  import IMPORT_JSON from '@/schema/import';
  import { javascript } from '@codemirror/lang-javascript';
  import { json } from '@codemirror/lang-json';

  const emit = defineEmits(['closeTipDialog']);
  interface IDialog {
    tipDialogVisible: boolean;
  }
  withDefaults(defineProps<IDialog>(), {
    tipDialogVisible: false
  });

  // 代码编辑器
  const code = ref<string>(JSON.stringify(IMPORT_JSON, null, 4));
  const extensions = [javascript(), json()];

  // 关闭
  const close = () => {
    emit('closeTipDialog');
  };
</script>

<style scoped></style>
