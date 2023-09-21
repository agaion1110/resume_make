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
    <!-- 增加自定义模块抽屉 -->
    <AddCustomModelDrawer :drawer-visible="drawerVisible" @close-add-drawer="closeAddDrawer"></AddCustomModelDrawer>
    <!-- 切换模板抽屉 -->
    <SwitchTemplateDrawer :drawer-switch-visible="drawerSwitchVisible" @close-switch-drawer="closeSwitchDrawer">
    </SwitchTemplateDrawer>
    <!-- 预览弹窗 -->
    <PreviewImage v-show="dialogPreviewVisible" @close="closePreview">
        <ResumePreview></ResumePreview>
    </PreviewImage>

    <!-- 下载(导出)弹窗 -->
    <DownloadDialog :dialog-download-visible="dialogDownloadVisible" @close-download-dialog="closeDownloadDialog"
        @download-file="downloadResumeFile"></DownloadDialog>
</template>
  
<script setup lang="ts">
import appStore from '@/store';
import { storeToRefs } from 'pinia';
import AddCustomModelDrawer from './AddCustomModelDrawer.vue';
import SwitchTemplateDrawer from './SwitchTemplateDrawer.vue';
import { getUserResumeListAsync, updateOnlineResumeAsync, updateUserresumeAsync } from '@/http/api/resume';
import moment from 'moment';
import { ElMessageBox } from 'element-plus';
// 是否展示标题输入框
const isShowIpt = ref(false);
const router = useRouter();
const route = useRoute();
// 获取简历的id
const id = route.query;

// store里的模板数据
let { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
// 控制简历预览弹窗
let dialogPreviewVisible = ref(false);

// 新增任意简历模块
const drawerVisible = ref<boolean>(false);
const openAddDrawer = () => {
    drawerVisible.value = true;
}
const closeAddDrawer = () => {
    drawerVisible.value = false;
}

// 打开 切换模板 抽屉
const drawerSwitchVisible = ref<boolean>(false);
const switchDrawer = () => {
    drawerSwitchVisible.value = true;
}
const closeSwitchDrawer = () => {
    drawerSwitchVisible.value = false;
}
// 保存草稿数据到本地
// 简历描述
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
                console.log('新拿到的', resumeJsonNewStore.value.COMPONENTS);

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


// 点击修改标题
let titleIpf = ref<any>();
const changeTitle = () => {
    isShowIpt.value = true;
    titleIpf.value.focus();
}
// 输入框失去焦点，隐藏输入框，展示标题
const blurTitle = () => {
    isShowIpt.value = false;
}
// 下载到本地
const dialogDownloadVisible = ref<boolean>(false);
const downloadResume = () => {
    dialogDownloadVisible.value = true;
}
// 关闭下载弹窗
const closeDownloadDialog = () => {
    dialogDownloadVisible.value = false;
};
// 点击下载
const downloadResumeFile = async (type: string) => {

};
// 点击预览
const previewResume = () => {
    dialogPreviewVisible.value = true;
    console.log('点击预览');
}
// 保存为草稿
const saveDraft = async () => {
    saveDataToLocal(true)
}

// 重置所有设置
const reset = () => {
    console.log('重置所有设置');
}
// 导出为JSON数据
const exportJSON = () => {
    console.log('导出为JSON数据');
}
// 分享简历
const publishOnlineResume = () => {
    console.log('分享简历');
}
// 导入JSON数据
const importJson = () => {
    console.log('导入JSON数据');
}
// 点击关闭预览
const closePreview = () => {
    console.log('点击关闭预览');
    dialogPreviewVisible.value = false;
}
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