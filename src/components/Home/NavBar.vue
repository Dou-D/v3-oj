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
            </RouterLink>
        </a-col>
    </a-row>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, BookOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
const current = ref(['mail']);
const items = ref([
    {
        key: 'home',
        icon: () => h(MailOutlined),
        label: '主页',
        title: '主页',
    },
    {
        key: 'bank',
        icon: () => h(BookOutlined),
        label: '题库',
        title: '题库',
    },
    {
        key: 'record',
        icon: () => h(MenuUnfoldOutlined),
        label: '提交记录',
        title: '提交记录',
    },
]);
</script>