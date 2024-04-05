<template>
    <a-row>
        <a-col flex="1 1 200px">
            <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
        </a-col>
        <a-col flex="0 1 300px">
            <RouterLink to="/login">
                <a-avatar style="background-color: #87d068">
                    <UserOutlined />
                </a-avatar>
                <span>dou</span>
            </RouterLink>
        </a-col>
    </a-row>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { h, ref } from 'vue';
import { MailOutlined, UserOutlined, BookOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const current = ref(['mail']);

const navigate = (path) => {
    router.push(path);
};
// const props = defineProps({
//     items: {
//         type: Array,
//         default: () => [],
//     },
// })
const items = ref([
    {
        key: 'home',
        icon: () => h(MailOutlined),
        label: '主页',
        // 移除 href 属性，改用 onClick 进行导航
        onClick: () => navigate('/home'),
    },
    {
        key: 'bank',
        icon: () => h(BookOutlined),
        label: '题库',
        // 添加 onClick 属性进行导航
        onClick: () => navigate('/problems'),
    },
    {
        key: 'record',
        icon: () => h(MenuUnfoldOutlined),
        label: '提交记录',
        // 添加 onClick 属性进行导航
        onClick: () => navigate('/record'),
    },
]);
</script>
