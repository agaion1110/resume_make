<template>
  <div class="pagination-box">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['handleCurrentChange']);
  defineProps<{
    total: number;
    limit: number;
    currentPage: number;
  }>();

  // 改变页码时触发
  const handleCurrentChange = (currentPage: number) => {
    emit('handleCurrentChange', currentPage);
  }
</script>

<style lang="scss" scoped>
  .pagination-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
</style>
