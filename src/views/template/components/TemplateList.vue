<template>
    <div class="template-card-list-box">
        <div class="card-box-item" v-for="(item, index) in templateList" :key="index">
            <TemplateCard :card-data="item" @to-design="toDesign"></TemplateCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ITempData } from "@/template/type";
defineProps<{
    templateList: Array<ITempData>;
}>();

// 跳转至设计
const router = useRouter();
const toDesign = (data: ITempData) => {
    router.push({
        path: '/designer',
        query: {
            id: data.ID
        }
    })
}
</script>

<style scoped>
.template-card-list-box {
    display: flex;
    flex-wrap: wrap;
    padding: 30px 0 0 0;

    .card-box-item {
        &:not(:nth-child(4n)) {
            margin-right: 33px;
        }
    }
}
</style>