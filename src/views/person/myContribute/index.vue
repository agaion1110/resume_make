<template>
  <div class="my-contribute-box">
    <el-tabs v-model="activeName" @tab-change="handleChange">
      <el-tab-pane
        v-for="(item, index) in tabPaneList"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <div v-if="!isShowSkeleton" class="content-box">
          <el-table
            v-if="templateList.length"
            class="template-list-table"
            :data="templateList"
            style="width: 100%"
            size="default"
            border
          >
            <el-table-column prop="TITLE" label="模板标题"></el-table-column>
            <el-table-column prop="CATEGORY" label="模板分类">
              <template #default="scope">
                <div>{{ getCategoryLabel(scope.row.CATEGORY) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期">
              <template #default="scope">
                <div>{{
                  moment(new Date(scope.row.createDate)).format('YYYY-MM-DD HH:mm:ss')
                }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="updateDate" label="更新日期">
              <template #default="scope">
                <div>{{
                  moment(new Date(scope.row.updateDate)).format('YYYY-MM-DD HH:mm:ss')
                }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="PASS_AUDIT" label="审核状态">
              <template #default="scope">
                <div>
                  <el-tag v-if="scope.row.PASS_AUDIT == 1" type="success">已同意</el-tag>
                  <el-tag v-else-if="scope.row.PASS_AUDIT == 2" type="error">拒绝</el-tag>
                  <el-tag v-else-if="scope.row.PASS_AUDIT == 3" type="info">待审核</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template #default="scope">
                <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 无数据页 -->
          <template v-else>
            <div class="audit-no-data-box">
              <NoData width="200px" height="200px"></NoData>
              <div class="button" @click="toCustom"> 贡献模板 </div>
            </div>
          </template>
        </div>
        <el-skeleton v-else :rows="5" animated></el-skeleton>
      </el-tab-pane>
    </el-tabs>
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
  // import NoData from '@/components/NoData/NoData.vue';
  // import { categoryDic } from '@/dictionary/category';
  import appStore from '@/store';
  import moment from 'moment';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { getMyContributeTemplateListAsync } from '@/http/api/resume';

  // tabs项
  const tabPaneList = reactive([
    {
      label: '待审核',
      name: 3
    },
    {
      label: '同意',
      name: 1
    },
    {
      label: '拒绝',
      name: 2
    }
  ]);
  const activeName = ref(3);

  // tab项切换时触发
  const handleChange = () => {
    getMyContributeList();
  };

  // 用户查询自己贡献的模板列表
  const templateList = ref<any>([]);
  const isShowSkeleton = ref<boolean>(true);
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getMyContributeList = async () => {
    isShowSkeleton.value = true;
    let params = {
      email: appStore.useUserInfoStore.userInfo.email,
      page: page.value,
      limit: limit.value,
      audit: Number(activeName.value)
    };
    const data = await getMyContributeTemplateListAsync(params);
    if (data.data.status === 200) {
      templateList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
      ElMessage.error(data.data.message);
    }
  };
  getMyContributeList();

  // 返回分类映射
const getCategoryLabel = (item: Array<string>) => {
  return '暂无分类';
    // if (!item.length) {
    //   return '暂无分类';
    // } else if (item.length === 1) {
    //   return categoryDic[item[0]];
    // } else {
    //   let itemFilter = item.map((e: string) => {
    //     return categoryDic[e];
    //   });
    //   return itemFilter.join('、');
    // }
  };

  // 点击编辑
  const router = useRouter();
  const edit = (row: any) => {
    router.push({
      path: '/custom',
      query: {
        ID: row.ID,
        previewUrl: row.previewUrl,
        category: JSON.stringify(row.CATEGORY)
      }
    });
  };
  // 点击贡献模板
  // const { resetResumeJson } = appStore.useResumeJsonNewStore;
  const toCustom = () => {
    // resetResumeJson(); //  重置简历数据
    router.push({
      path: '/custom'
    });
  };

  // 页码改变时触发
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getMyContributeList();
  };
</script>

<style lang="scss" scoped>
  .my-contribute-box {
    :deep(.el-tabs__content) {
      padding: 0;
    }
    .audit-no-data-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
      .button {
        width: 120px;
        height: 38px;
        margin-right: 20px;
        line-height: 38px;
        text-align: center;
        letter-spacing: 2px;
        color: #fff;
        font-size: 14px;
        background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        background-color: #2ddd9d;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        cursor: pointer;
        user-select: none;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
