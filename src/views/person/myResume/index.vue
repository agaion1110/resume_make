<template>
  <div class="my-resume-box">
    <!-- 简历列表 -->
    <div v-if="!isShowSkeleton" class="resume-list">
      <template v-for="(item, index) in templateList" :key="index">
        <ResumeCard :card-data="item" @delete="deleteUserResume"></ResumeCard>
      </template>
      <!-- 无数据页 -->
      <NoData v-if="!templateList.length" width="200px" height="200px"></NoData>
    </div>
    <el-skeleton v-else :rows="8" animated />
    <!-- 分页组件 -->
    <Pagination
      v-if="total > limit"
      :limit="limit"
      :total="total"
      :current-page="currentPage"
      @handle-current-change="handleCurrentChange"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
  import ResumeCard from './components/ResumeCard.vue';
  import { getUserResumeListAsync, deleteUserResumeAsync } from '@/http/api/resume';
  import Pagination from '@/components/Pagination/pagination.vue';

  // 获取用户简历列表
  const isShowSkeleton = ref<boolean>(true);
  const templateList = ref<any>([]);
  const page = ref<number>(1);
  const limit = ref<number>(6);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getUserResumeList = async () => {
    isShowSkeleton.value = true;
    const params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getUserResumeListAsync(params);
    if (data.data.status === 200) {
      templateList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
    }
  };
  getUserResumeList();

  // 点击删除简历
  const deleteUserResume = async (id: string) => {
    const data = await deleteUserResumeAsync(id);
    if (data.data.status === 200) {
      ElMessage.success('删除成功!');
      page.value = 1;
      currentPage.value = 1;
      getUserResumeList();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 页码改变时触发
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserResumeList();
  };
</script>

<style lang="scss" scoped>
  .my-resume-box {
    display: flex;
    flex-direction: column;
    .resume-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & :last-child:nth-child(3n - 1) {
        margin-right: calc(260px + 15px);
      }
    }
  }
</style>
