<template>
    <div class="design-box">
        <!-- 导航栏 -->
        <DesignNav></DesignNav>
        <!-- 内容区 -->
        <div class="bottom">
            <!-- 左侧添加模块区 -->
            <div class="left" ref="leftRef">
                <c-scrollbar tarigger="hover">
                    <Title show-collapse @unfold-or-collapse="unfoldOrCollapse"></Title>
                    <ModelList :key="refreshUuid" :left-show-status="leftShowStatus"></ModelList>
                </c-scrollbar>
            </div>
            <!-- 效果预览区 -->
            <div class="center" id="print">
                <!-- 放大缩小组件 -->
                <zoom-and-out @add-size="addSize" @reduce-size="reduceSize"></zoom-and-out>
                <component :is="resumeBackgroundName" ref="html2Pdf" :key="refreshUuid">
                    <!-- 内容区域 -->
                    <div class="design-content" ref="htmlContentPdf">
                        <component :is="custom" ref="customRef" @content-height-change="contentHeightChange"></component>
                    </div>
                </component>
            </div>
            <div class="config" ref="configRef" :key="refreshUuid">
                <TitleConfig :title="cptTitle" @unfold-or-collapse="unfoldOrCollapseConfig"></TitleConfig>
                <c-scrollbar trigger="hover" :h-thumb-style="{
                    'background-color': 'rgba(0,0,0,0.4)'
                }">
                    <component :is="optionsComponents[appStore.useSelectMaterialStore.cptOptionsName]"
                        v-if="appStore.useSelectMaterialStore.cptName" :key="appStore.useSelectMaterialStore.cptKeyId">
                    </component>
                    <!-- 全局主题样式设置 -->
                    <GlobalStyleOptionsVue v-else></GlobalStyleOptionsVue>
                </c-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import appStore from '@/store';
import DesignNav from './components/DesignNav.vue'
import Title from './components/Title.vue'
import ModelList from './components/ModelList.vue'
import IDESIGNJSON from '@/interface/design';
import { getResetTemplateInfoAsync, getTemplateInfoAsync } from '@/http/api/resume';
import resumeBackgroundComponents from '@/utils/registerResumeBackgroundCom';
import custom from '@/template/custom/index.vue';
import optionsComponents from '@/utils/registerMaterialOptionsCom';
import GlobalStyleOptionsVue from '@/options/GlobalStyleOptions.vue';
import TitleConfig from './components/TitleConfig.vue';
import { closeGlobalLoading } from '@/utils/common';
// 简历的基本数据变量
const route = useRoute();
// 简历标题
const { cptTitle } = storeToRefs(appStore.useSelectMaterialStore);
const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据
const { id } = route.query; //  模板id
const { refreshUuid } = storeToRefs(appStore.useRefreshStore);
// 展开或收起左边模块选择菜单栏
const leftRef = ref<any>(null);
const leftShowStatus = ref<boolean>(true);
const unfoldOrCollapse = (status: boolean) => {
    if (status) {
        // 展开
        setTimeout(() => {
            leftShowStatus.value = status;
        }, 100);
        leftRef.value.style.width = '300px';
    } else {
        // 折叠
        setTimeout(() => {
            leftShowStatus.value = status;
        }, 100);
        leftRef.value.style.width = '70px';
    }
}
// 查询简历数据，如果存在草稿就返回，没有就相当于重置简历数据
const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
const { setUuid } = appStore.useRefreshStore;
const resetStoreAndLocal = async (isReset = false, ID = id) => {
    let TEMPLATE_JSON: IDESIGNJSON;
    let data;
    if (isReset) {
        data = await getResetTemplateInfoAsync(ID); // 重置数据
    } else {
        data = await getTemplateInfoAsync(ID); // 查询数据
    }
    if (data.data.status === 200) {
        TEMPLATE_JSON = data.data.data as IDESIGNJSON;
    } else {
        ElMessage.error('查询模板失败！');
        return;
    }
    changeResumeJsonData(TEMPLATE_JSON); // 更新数据
    setUuid(); // 更新uuid
}
resetStoreAndLocal();

// 放大缩小center
const sizeCenter = ref<number>(1);
const addSize = (number: number) => {
    sizeCenter.value = number;
};
const reduceSize = (number: number) => {
    sizeCenter.value = number;
}
// 返回简历背景
const resumeBackgroundName = computed(() => {
    return resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom
        ? resumeBackgroundComponents[resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom]
        : resumeBackgroundComponents['RESUME_BACKGROUND_DEFAULT'];
})

// 添加自定义模块是，左右布局单独处理
const customRef = ref<any>(null);
const addCustomModelLeftRight = (item: any) => {
    if (item.layout === 'left') {
        customRef.value.leftList.push(item);
    } else {
        customRef.value.rightList.push(item);
    }
};
provide('addCustomModelLeftRight', addCustomModelLeftRight);

// 子组件内容发生变化时--->需要重新计算高度，触发resizeDOM
const contentHeightChange = async (height: number) => {
    console.log('内容发生变化，需要重新计算高度');
}

// 展开或收起属性面板
const configRef = ref<any>(null);
const unfoldOrCollapseConfig = (status: boolean) => {
  if (status) {
    configRef.value.style.width = '355px';
    configRef.value.style.flex = 'inherit';
  } else {
    configRef.value.style.flex = 1;
  }
};
onMounted(() => {
    closeGlobalLoading(); //  关闭全局等待层
})
</script>

<style lang="scss" scoped>
.design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 1375px;

    .bottom {
        display: flex;
        width: 100%;

        .left {
            width: 300px;
            background-color: #fff;
            height: calc(100vh - 50px);
            overflow: auto;
            transition: all 0.3s;
        }

        .center {
            flex: 1;
            min-width: 840px;
            height: calc(100vh - 50px);
            overflow: auto;

            .design {
                // background: white;
                width: 820px;
                min-height: 1160px;
                margin: 40px auto;
                display: flex;
                position: relative;

                .lines {
                    z-index: 10;
                    width: 820px;
                    height: 4px;
                    background: #f3f3f3 url(@/assets/images/paging_bg.png) center top no-repeat;
                    user-select: none;
                    pointer-events: none;
                    position: absolute;
                    display: flex;
                    align-items: center;

                    .page-tips-one {
                        position: absolute;
                        top: -17px;
                        right: 0px;
                        font-size: 12px;
                        background: #ff9971;
                        color: #fff;
                        padding: 2px 8px;
                        border-radius: 8px 0 0 0;
                    }
                }

                .design-content {
                    font-family: v-bind('resumeJsonNewStore.GLOBAL_STYLE.fontFamily ? resumeJsonNewStore.GLOBAL_STYLE.fontFamily : "微软雅黑"'
                        );
                    zoom: v-bind('sizeCenter');
                }
            }
        }

        .config {
            width: 355px;
            background-color: #fff;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            height: calc(100vh - 50px);
            transition: all 0.3s;
        }
    }
}
</style>
<style lang="scss">
@import '../../style/options.scss';
</style>