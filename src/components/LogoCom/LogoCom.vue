<template>
    <div class="logo" @click="toHome">
      <svg-icon
        icon-name="huojian"
        class-name="bilibili"
        :color="iconColor"
        size="25px"
      ></svg-icon>
      <span>Resume Maker</span>
    </div>
  </template>
  
  <script setup lang="ts">
    interface IBgcColor {
      fontColor?: string;
      iconColor?: string;
    }
    withDefaults(defineProps<IBgcColor>(), {
      fontColor: '#74a274',
      iconColor: ''
    });
    const rouetr = useRouter();
    const toHome = () => {
      rouetr.push('/');
    };
  </script>
  
  <style scoped lang="scss">
  .logo{
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    img{
      width: 120px;
    }
    span {
      letter-spacing: 2px;
      font-size: 22px;
      font-weight: 600;
      font-family: monospace;
      color: v-bind(fontColor);
      margin-left: 10px;
    }
  }
  </style>
  