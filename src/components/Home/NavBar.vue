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
                        <a-menu-item v-for="item in menu" :key="item.id" @click="navigate(item.path)">
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

const menu = ref([])
const userStore = useUserStore()
console.log(userStore.identity, "user Menu");
menu.value = userStore.userPermissions || []
// 下拉菜单
const handleButtonClick = e => {
    console.log('click left button', e);
    if (!storage.get('sylu_user_token')) {
        navigate('/user/login')
    }
};
const handleMenuClick = e => {
    console.log('click', e);
};
// 退出登录
const logout = () => {
    storage.remove('sylu_user_token')
    userStore.logout()
    navigate('/user/login')
}
</script>
