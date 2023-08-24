import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';
import RESUME_JSON from '@/schema/resume';
import IRESUMEJSON from '@/interface/resume';
import { IMATERIALITEM } from '@/interface/material';

// 新的简历store
export const useResumeJsonNewStore = defineStore('resumeJsonNew', () => {
  const resume_json = cloneDeep(RESUME_JSON); // 简历数据
  const importJson = ref<IRESUMEJSON>(resume_json); //  导入的JSON数据
  // 修改后的简历JSON数据
  const resumeJsonNewStore = ref<IRESUMEJSON>(resume_json);
  // 改变当前简历JSON数据
  function changeResumeJsonData(obj: IRESUMEJSON) {
    resumeJsonNewStore.value = cloneDeep(obj);
  }
  // 改变导入的JSON数据
  function changeImportJsonData(obj: IRESUMEJSON) {
    importJson.value = cloneDeep(obj);
  }
  // 添加组件
  function pushComponent(data: IMATERIALITEM) {
    resumeJsonNewStore.value.COMPONENTS.push(data);
  }
  // 重置简历JSON数据
  function resetResumeJson() {
    resumeJsonNewStore.value = cloneDeep(resume_json);
  }

  return {
    resumeJsonNewStore,
    importJson,
    changeResumeJsonData,
    changeImportJsonData,
    pushComponent,
    resetResumeJson
  };
});

export const useSelectMaterialStore = defineStore('selectMaterialStore', () => {
  const cptName = ref<string>(''); // 选中的模块名称
  const cptOptionsName = ref<string>(''); // 选中的组件属性面板名称
  const cptTitle = ref<string>('全局主题设置'); // 选中的模块标题
  const cptKeyId = ref<string>(''); // 选中的模块KeyID

  // 更新
  function updateSelectModel(
    cptNameTxt: string,
    cptOptionsNameTxt: string,
    cptTitleTxt: string,
    cptKeyIdTxt: string
  ) {
    cptName.value = cptNameTxt;
    cptOptionsName.value = cptOptionsNameTxt;
    cptTitle.value = cptTitleTxt;
    cptKeyId.value = cptKeyIdTxt;
  }
  // 重置
  function resetSelectModel() {
    cptName.value = '';
    cptOptionsName.value = '';
    cptTitle.value = '全局主题设置';
    cptKeyId.value = '';
  }

  return {
    cptName,
    cptOptionsName,
    cptTitle,
    cptKeyId,
    updateSelectModel,
    resetSelectModel
  };
});
