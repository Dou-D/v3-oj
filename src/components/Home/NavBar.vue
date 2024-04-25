<template>
    <a-row>
        <a-col flex="1 1 200px">
            <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
        </a-col>
        <a-flex align="center">
            <a-input-search v-model:value="value" placeholder="input search text" size="large" enter-button="Search"
                @search="onSearch" />
        </a-flex>
        <a-col flex="0 1 300px">
            <a-avatar style="background-color: #87d068">
                <UserOutlined />
            </a-avatar>
            <a-dropdown-button @click="handleButtonClick">
                dou
                <template #overlay>
                    <a-menu @click="handleMenuClick">
                        <a-menu-item v-for="item in menu" :key="item.title">
                            {{ item.title }}
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown-button>
        </a-col>
    </a-row>
</template>

<script setup>
import { UserOutlined } from '@ant-design/icons-vue'
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import storage from '@/services/storage';
import { useUserStore } from '@/stores/user'
const current = ref(['home']);

// 搜索框
const value = ref('');
const onSearch = (val) => {
    console.log(val);
}

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})
const router = useRouter();
const items = props['items']
const navigate = (path) => {
    router.push(path);
};

const menu = ref([
    {
        id: 1,
        title: '个人中心',
        path: '/user',
    }, {
        id: 2,
        title: '退出登录',
        path: '/logout',
    }
])
const userStore = useUserStore()
menu.value.push(...userStore.menu);
// 下拉菜单
const handleButtonClick = e => {
    console.log('click left button', e);
    if (!storage.get('sylu_user_token')) {
        navigate('/user/login')
    }
};
const handleMenuClick = e => {
    switch (e.key) {
        case '个人中心':
            router.push('/user')
            break
        case '退出登录':
            storage.remove('sylu_user_token')
            router.push('/user/login')
            break
        case '题目管理':
            router.push('/console/problems')
            break
        case '用户管理':
            router.push('/console/user')
            break
        case '添加题目':
            router.push('/console/addproblem')
            break
        default:
            router.push('/404')
    }
};
// 退出登录
const logout = () => {
    storage.remove('sylu_user_token')
    userStore.logout()
    navigate('/user/login')
}

</script>
