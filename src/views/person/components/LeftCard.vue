<template>
    <div class="left-person-card">
      <!-- 头像 -->
      <div class="avatar-box">
        <el-upload
          class="avatar-uploader"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
            :src="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
            alt=""
            class="avatar"
          />
          <el-avatar v-else :size="70">
            {{ appStore.useUserInfoStore.userInfo.name.split('')[0] }}
          </el-avatar>
          <!-- 相机图标 -->
          <div class="camera-box">
            <svg-icon icon-name="icon-xiangji1" class="iconfont" color="#fff" size="20px"></svg-icon>
          </div>
        </el-upload>
      </div>
      <!-- 菜单 -->
      <PersonMenu></PersonMenu>
    </div>
  </template>
  
  <script setup lang="ts">
    import PersonMenu from './PersonMenu.vue';
    import { updateUserAvatarAsync } from '@/http/api/user';
    import CONFIG from '@/config';
    import appStore from '@/store';
    import { UploadProps } from 'element-plus';
  
    // 上传文件的地址
    const uploadAddress = () => {
      return CONFIG.serverAddress + '/huajian/upload/file/avatar';
    };
  
    // 上传事件回调
    const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
    const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
      appStore.useUserInfoStore.userInfo.photos.profilePic.url = response.data.data.fileUrl;
      let params = {
        avatar: response.data.data.fileUrl
      };
      const data = await updateUserAvatarAsync(params);
      if (data.status === 200) {
        ElMessage.success('更新成功!');
        // 更新用户信息
        getAndUpdateUserInfo();
      } else {
        ElMessage.error(data.message);
      }
    };
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('图片大小不能超过5M!');
        return false;
      }
      return true;
    };
  </script>
  
  <style lang="scss" scoped>
    .left-person-card {
      width: 300px;
      min-height: 400px;
      border-radius: 5px;
      box-shadow: 0 5px 21px 0 rgb(78 78 78 / 25%);
      background-color: rgba(#fff, 0.5);
      z-index: 2;
      margin-top: 90px;
      .avatar-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 140px;
        .avatar-uploader {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          // overflow: hidden;
          position: relative;
          .camera-box {
            position: absolute;
            right: 6px;
            bottom: -7px;
          }
          :deep(.el-upload) {
            width: 70px;
            height: 70px;
            border: 1px solid #ccc !important;
            border-radius: 50%;
            .avatar {
              width: 70px;
              height: 70px;
              border-radius: 50%;
            }
          }
        }
      }
    }
  </style>
  