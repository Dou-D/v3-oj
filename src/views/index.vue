<template>
    <a-layout>
        <a-layout-header :style="headerStyle">
            <NavBar />
        </a-layout-header>
        <a-layout>
            <a-layout-content :style="contentStyle">
                <RouterView />
            </a-layout-content>
            <a-layout-sider :style="siderStyle">Sider</a-layout-sider>
        </a-layout>
        <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>
</template>
<script setup>
import NavBar from '@/components/Home/NavBar.vue';
import { RouterView, RouterLink } from 'vue-router';
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

<style>

</style>