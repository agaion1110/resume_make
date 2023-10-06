<template>
    <nav class="nav-box">
      <div class="nav-left">
        <LogoCom icon-color="#74a274" font-color="#74a274"></LogoCom>
      </div>
      <div class="nav-center">
        <!-- 左侧菜单 -->
        <div class="left">
          <div class="nav-center-left-box">
            <el-tooltip effect="dark" content="新增任意简历模块" placement="bottom">
              <div class="icon-box" @click="openAddDrawer">
                <svg-icon icon-name="icon-database" color="#555" size="17px"></svg-icon>
                <span class="icon-tips">添加模块</span>
              </div>
            </el-tooltip>
            <el-tooltip effect="dark" content="切换另一个模板" placement="bottom">
              <div class="icon-box" @click="switchDrawer">
                <svg-icon icon-name="icon-shangchengmoban" color="#555" size="17px"></svg-icon>
                <span class="icon-tips">切换模板</span>
              </div>
            </el-tooltip>
          </div>
          <div class="draft-tips-box">
            <span class="draft-tips">{{ draftTips }}</span>
          </div>
        </div>
        <div class="center">
          <p v-show="!isShowIpt">
            {{ resumeJsonNewStore.TITLE }}
            <el-icon :size="20" color="#409eff" @click="changeTitle">
              <Edit />
            </el-icon>
          </p>
          <el-input v-show="isShowIpt" ref="titleIpf" v-model="resumeJsonNewStore.TITLE" autofocus placeholder="请输入标题"
            @blur="blurTitle"></el-input>
        </div>
        <div class="right"></div>
      </div>
      <div class="nav-right">
        <el-tooltip effect="dark" content="下载到本地" placement="bottom">
          <div class="icon-box icon-download" @click="downloadResume">
            <svg-icon icon-name="icon-xiazai" color="#fff" size="17px"></svg-icon>
            <span class="icon-tips">下载</span>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="预览简历" placement="bottom">
          <div class="icon-box" @click="previewResume">
            <svg-icon icon-name="icon-yulan1" color="#555" size="19px"></svg-icon>
            <span class="icon-tips">预览</span>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="保存为草稿" placement="bottom">
          <div class="icon-box" @click="saveDraft">
            <svg-icon icon-name="icon-caogaoxiang1" color="#555" size="17px"></svg-icon>
            <span class="icon-tips">暂存</span>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="重置所有设置" placement="bottom">
          <div class="icon-box" @click="reset">
            <svg-icon icon-name="icon-zhongzhi" color="#555" size="17px"></svg-icon>
            <span class="icon-tips">重置</span>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="导出为JSON数据" placement="bottom">
          <div class="icon-box" @click="exportJSON">
            <svg-icon icon-name="icon-xiazai" color="#555" size="17px"></svg-icon>
            <span class="icon-tips">JSON</span>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="将你的简历分享给别人" placement="bottom">
          <div class="icon-box" @click="publishOnlineResume">
            <svg-icon icon-name="icon-fenxiang" color="#555" size="17px"></svg-icon>
            <span class="icon-tips">分享</span>
          </div>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="导入JSON数据" placement="bottom">
          <div class="icon-box" @click="importJson">
            <svg-icon icon-name="icon-yunduanshangchuan" color="#555" size="19px"></svg-icon>
            <span class="icon-tips">导入JSON</span>
          </div>
        </el-tooltip>
      </div>
    </nav>
  
    <!-- 上传JSON代码编辑器 -->
    <ImportJsonDialog :dialog-visible="dialogVisible" @cancel="cancelJsonDialog"></ImportJsonDialog>
    <!-- 在线简历发布成功的弹窗 -->
    <OnlineSuccessDialog :dialog-online-visible="dialogOnlineVisible" :resume-id="resumeId" @cancel="cancelOnlineDialog">
    </OnlineSuccessDialog>
    <!-- 增加自定义模块抽屉 -->
    <AddCustomModelDrawer :drawer-visible="drawerVisible" @close-add-drawer="closeAddDrawer"></AddCustomModelDrawer>
    <!-- 切换模板抽屉 -->
    <SwitchTemplateDrawer :drawer-switch-visible="drawerSwitchVisible" @close-switch-drawer="closeSwitchDrawer">
    </SwitchTemplateDrawer>
    <!-- 下载(导出)弹窗 -->
    <DownloadDialog :dialog-download-visible="dialogDownloadVisible" @close-download-dialog="closeDownloadDialog"
      @download-file="downloadResumeFile"></DownloadDialog>
    <!-- 预览弹窗 -->
    <PreviewImage v-show="dialogPreviewVisible" @close="closePreview">
      <ResumePreview></ResumePreview>
    </PreviewImage>
  </template>
  
  <script setup lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { getUserResumeListAsync, updateUserresumeAsync } from '@/http/api/resume';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import moment from 'moment';
  import { cloneDeep } from 'lodash';
  import { getUuid } from '@/utils/common';
  import FileSaver from 'file-saver';
  import { publishOnlineResumeAsync } from '@/http/api/userResume';
  import ImportJsonDialog from '@/components/ImportJsonDialog/ImportJsonDialog.vue';
  import OnlineSuccessDialog from './OnlineSuccessDialog.vue';
  import AddCustomModelDrawer from './AddCustomModelDrawer.vue';
  import SwitchTemplateDrawer from './SwitchTemplateDrawer.vue';
  import DownloadDialog from './DownloadDialog.vue';
  
  const route = useRoute();
  const router = useRouter();
  const emit = defineEmits(['generateReport', 'generateReportNew', 'reset']);
  // store里的模板数据
  let { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  // 获得模板ID
  const { id } = route.query;
  
  // 打开添加自定义模块抽屉
  const drawerVisible = ref<boolean>(false);
  const openAddDrawer = () => {
    drawerVisible.value = true;
    console.log('打开抽屉', drawerVisible.value);
  };
  // 关闭抽屉
  const closeAddDrawer = () => {
    drawerVisible.value = false;
    console.log('关闭抽屉', drawerVisible.value);
  };
  
  // 打开 切换模板 抽屉
  const drawerSwitchVisible = ref<boolean>(false);
  const switchDrawer = () => {
    drawerSwitchVisible.value = true;
  };
  // 关闭 切换模板 抽屉
  const closeSwitchDrawer = () => {
    drawerSwitchVisible.value = false;
  };
  // 保存草稿数据到本地
  let draftTips = ref<string>('');
  const saveDataToLocal = async (isHandle?: boolean) => {
    return new Promise(async (resolve, reject) => {
      // 先查询用户个人简历是否超过4份
      const params = {
        page: 1,
        limit: 10
      };
      const listData = await getUserResumeListAsync(params);
      if (listData.data.status === 200) {
        // 先过滤掉本条数据
        let realList = [];
        listData.data.data.list.map((item: any) => {
          if (item.ID !== id) {
            realList.push(item);
          }
        });
        // 判断用户简历数量是否超过
        if (realList.length >= 4) {
          ElMessageBox.confirm(
            '每位用户的简历数量最多4份，您已超过4份简历，如要继续使用，请前往个人中心删除部分简历！',
            '温馨提示',
            {
              confirmButtonText: '前往',
              cancelButtonText: '取消'
            }
          )
            .then(() => {
              router.push('/person/myResume');
            })
            .catch((err) => console.log(err));
          // 简历份数超限制
          reject(null);
        } else {
          const data = await updateUserresumeAsync(resumeJsonNewStore.value);
          if (data.data.status === 200) {
            const time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
            draftTips.value = `已自动保存草稿  ${time}`;
            // 手动保存
            if (isHandle) {
              ElMessage.success({
                message: '保存草稿成功!',
                type: 'success',
                center: true
              });
            }
            resolve('保存草稿成功!');
          } else {
            draftTips.value = '自动保存草稿失败！';
            reject(null);
          }
        }
      } else {
        ElMessage.error(listData.data.message);
        reject(null);
      }
    });
  };
  
  // 更改标题
  const titleIpf = ref<any>();
  const isShowIpt = ref<boolean>(false);
  const changeTitle = () => {
    isShowIpt.value = true;
    titleIpf.value.focus();
  };
  const blurTitle = () => {
    isShowIpt.value = false;
  };
  
  // 打开下载弹窗
  const dialogDownloadVisible = ref<boolean>(false);
  const downloadResume = () => {
    dialogDownloadVisible.value = true;
  };
  // 关闭下载弹窗
  const closeDownloadDialog = () => {
    dialogDownloadVisible.value = false;
  };
  // 点击下载
  const downloadResumeFile = async (type: string) => {
    await saveDataToLocal();
    emit('generateReport', type);
    closeDownloadDialog();
  };
  
  // 打开预览弹窗
  const dialogPreviewVisible = ref<boolean>(false);
  const previewResume = () => {
    dialogPreviewVisible.value = true;
  };
  // 关闭预览弹窗
  const closePreview = () => {
    dialogPreviewVisible.value = false;
  };
  
  // 点击保存草稿
  const saveDraft = () => {
    // 手动保存
    saveDataToLocal(true);
  };
  
  // 点击重置
  const reset = () => {
    ElMessageBox.confirm('此操作会重置简历至初始状态，是否继续?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        emit('reset');
        draftTips.value = '';
      })
      .catch((err) => console.log(err));
  };
  
  // 上传JSON弹窗
  const dialogVisible = ref<boolean>(false);
  const importJson = () => {
    dialogVisible.value = true;
  };
  // 取消上传JSON
  const cancelJsonDialog = () => {
    dialogVisible.value = false;
  };
  
  // 导出JSON
  const exportJSON = () => {
    let JSONData = cloneDeep(resumeJsonNewStore.value);
    JSONData.ID = getUuid();
    const data = JSON.stringify(JSONData, null, 4);
    const blob = new Blob([data], { type: '' });
    FileSaver.saveAs(blob, resumeJsonNewStore.value.TITLE + '.json');
  };
  
  // 发布为线上简历
  const resumeId = ref<string>('');
  const { userInfo } = appStore.useUserInfoStore;
  const publishOnlineResume = async () => {
    // 先保存草稿
    let draft = await saveDataToLocal();
    if (draft) {
      let params = {
        email: userInfo.email,
        ID: route.query.id
      };
      const data = await publishOnlineResumeAsync(params);
      if (data.data.status === 200) {
        ElMessage.success('分享链接已生成!');
        resumeId.value = data.data.data.ONLINE_LINK;
        dialogOnlineVisible.value = true;
      } else {
        ElMessage.error(data.data.message);
      }
    }
  };
  
  // 在线简历发布成功的弹窗
  const dialogOnlineVisible = ref<boolean>(false);
  // 关闭弹窗
  const cancelOnlineDialog = () => {
    dialogOnlineVisible.value = false;
  };
  </script>
  
  <style lang="scss" scoped>
  .nav-box {
    height: 60px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    z-index: 20;
  
    .nav-left {
      width: 300px;
      display: flex;
      align-items: center;
      user-select: none;
      padding: 0 0 0 40px;
    }
  
    .nav-center {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 100%;
  
      .left {
        display: flex;
        height: 100%;
  
        .nav-center-left-box {
          height: 100%;
          display: flex;
  
          .icon-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #555;
            cursor: pointer;
            padding: 0 15px;
            height: 100%;
            transition: all 0.3s;
  
            &:hover {
              background-color: rgba($color: #74a274, $alpha: 0.1);
              color: #74a274;
            }
  
            .icon-tips {
              font-size: 12px;
              margin-top: 8px;
            }
          }
        }
  
        .draft-tips-box {
          height: 100%;
          display: flex;
          align-items: center;
          margin-left: 10px;
  
          .draft-tips {
            font-size: 10px;
            color: #999999;
          }
        }
      }
  
      .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
  
        p {
          display: flex;
          align-items: center;
          font-size: 16px;
  
          .el-icon {
            margin-left: 10px;
            cursor: pointer;
          }
        }
  
        .el-input {
          width: 200px;
        }
      }
    }
  
    .nav-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 50px;
  
      .icon-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #555;
        cursor: pointer;
        padding: 0 15px;
        height: 100%;
        transition: all 0.3s;
  
        &:hover {
          background-color: rgba($color: #74a274, $alpha: 0.1);
          color: #74a274;
        }
  
        .icon-tips {
          font-size: 12px;
          margin-top: 8px;
        }
      }
  
      .icon-download {
        background-color: rgba($color: #74a274, $alpha: 1);
        color: #fff;
  
        &:hover {
          background-color: rgba($color: #74a274, $alpha: 0.9);
          color: #fff;
        }
      }
    }
  }
  </style>