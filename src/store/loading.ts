import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loadingStore', () => {
  const isLoading = ref<boolean>(false);
  function changeLoading(status: boolean) {
    isLoading.value = status;
  }
  return {
    isLoading,
    changeLoading
  };
});
