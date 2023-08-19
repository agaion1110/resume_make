<template>
    <div class="card-wrapper" @mouseover="mouseover" @mouseleave="mouseleave">
        <!-- 简历卡片封面 -->
        <div class="template-card-box">
            <img :src="cardData.previewUrl" alt="">
            <!-- 遮罩层 -->
            <div ref="maskLayerRef" class="mask-layer">
                <div v-if="cardData.NAME !== 'custom'" class="preview-icon" title="预览" @click="previewImg">
                    <svg-icon icon-name="yulan" class-name="yulan" color="#fff"></svg-icon>
                </div>
                <div class="design-button" @click="">立即免费制作</div>
            </div>
        </div>
        <!-- 使用人数 -->
        <div class="viewer-box">
            <!-- 模板作者 -->
            <div class="create-user">
                <el-avatar v-if="cardData.userInfo.avatar" :size="30" :src="cardData.userInfo.avatar"></el-avatar>
                <span class="name">{{ cardData.userInfo.name }}</span>
            </div>
            <div class="icon-box">
                <svg-icon icon-name="icon-pinglun1" color="#a3abb1" size="19px"></svg-icon>
                <span class="number">{{ cardData.commentCount }}</span>
                <svg-icon icon-name="icon-jibenziliao" color="#a3abb1" size="19px"></svg-icon>
                <span class="number">{{ cardData.VIEWS }}</span>
            </div>
        </div>
    </div>

    <!-- 预览简历 -->
    <PreviewImage @close="close" v-show="dialogVisible">
        <img :src="cardData.previewUrl" class="previewImg" alt="">
    </PreviewImage>
</template>

<script setup lang="ts">
import { ITempData } from '../../template/type';
import PreviewImage from '../PreviewImage/PreviewImage.vue';
const props = defineProps<{
    cardData: ITempData;
}>();
// 控制遮罩层元素
const maskLayerRef = ref<any>(null);
// 当鼠标移到卡片上时，显示遮罩层
const mouseover = () => {
    maskLayerRef.value.style.opacity = 1;
}
// 当鼠标移出卡片时，隐藏遮罩层
const mouseleave = () => {
    maskLayerRef.value.style.opacity = 0;
}
// 控制预览模块显示与隐藏变量
const dialogVisible = ref<boolean>(false);
// 点击预览
const previewImg = () => { 
    dialogVisible.value = true;
}
// 点击关闭
const close = () => { 
    dialogVisible.value = false;
}

</script>

<style lang="scss" scoped>
.card-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    border-radius: 5px;
    overflow: hidden;
    width: 300px;
    height: 440px;
    flex-basis: fit-content;
    transition: all 0.3s;

    &:hover {
        box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 24%);
        transform: translateY(2%) scale(1.03);
        background-color: #fff;

        .viewer-box {
            color: #949ba0;
            transform: translateY(0%) scale(1);
        }
    }

    .template-card-box {
        height: 400px;
        background-color: #fff;
        position: relative;
        z-index: 0;
        user-select: none;
        transition: all 0.3s;

        img {
            width: 100%;
            height: 100%;
        }

        .mask-layer {
            height: 100%;
            width: 100%;
            border-radius: 5px 5px 0 0;
            position: absolute;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            transition: all 0.3s;
            opacity: 0;

            .design-button {
                width: 100px;
                height: 30px;
                font-size: 13px;
                background-color: #2cbd99;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ffffff;
                transition: all 0.3s;

                &:hover {
                    background-color: rgba(#42aa90, 0.7);
                }
            }

            .preview-icon {
                position: absolute;
                right: 15px;
                top: 15px;
                z-index: 12;
                width: 30px;
                height: 30px;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;

                .yulan {
                    cursor: pointer;
                    font-size: 20px;
                }
            }
        }
    }

    .viewer-box {
        flex: 1;
        width: 100%;
        color: #a3abb1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;

        .create-user {
            display: flex;
            align-items: center;

            .name {
                margin-left: 10px;
                font-size: 12px;
            }
        }

        .icon-box {
            display: flex;
            align-items: center;
            margin-right: 5px;

            .svg-icon {
                margin-left: 10px;
            }

            .number {
                margin-left: 5px;
            }
        }
    }
}

.previewImg {
    height: 90vh;
}
</style>