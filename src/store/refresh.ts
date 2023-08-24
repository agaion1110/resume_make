import { getUuid } from '@/utils/common';
import { defineStore } from 'pinia';
export const userRefreshStore = defineStore('refreshStore', () => {
    const refreshUuid = ref<string>('');
    function setUuid() {
        refreshUuid.value = getUuid();
    }
    return {
        refreshUuid,
        setUuid
    }
})