<template>
    <a-layout>
        <a-layout-header :style="headerStyle">
            <NavBar :items="items" />
        </a-layout-header>
        
        <a-layout>
            <a-layout-content :style="contentStyle">
                <RouterView />
            </a-layout-content>
        </a-layout>
        <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>
</template>
<script setup>
import NavBar from '@/components/Home/NavBar.vue';
import { RouterView, RouterLink, useRouter } from 'vue-router';
import { h, ref } from 'vue'
import { MailOutlined, UserOutlined, BookOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const navigate = (path) => {
    router.push(path);
};
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
    {
        key: 'create',
        icon: () => h(UserOutlined),
        label: '创建比赛',
        onClick: () => navigate('/create'),
    }
]);

/**
 * @headerStyle {object} - Header style
 * @contentStyle {object} - Content style
 * @siderStyle {object} - Sider style
 * @footerStyle {object} - Footer style
 */
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#fff',

};
const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    // lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#108ee9',
};
const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};
</script>
