<template>
    <a-row>
        <a-col flex="1 1 200px">
            <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
        </a-col>
        <a-col flex="0 1 300px">
            <a-dropdown-button @click="handleButtonClick">
                dou
                <template #overlay>
                    <a-menu @click="handleMenuClick">
                        <a-menu-item v-for="item in menu" :key="item.path">
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
import EventBus from '@/utils/eventBus';
const current = ref(['1']);
const router = useRouter();

// 搜索框
const value = ref('');
const onSearch = (val) => {
    EventBus.emit("searchProblem", val)
    // router.push('problems')
}

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})
const items = props['items']
const navigate = (path) => {
    router.push(path);
};

const menu = ref([
    {
        title: '个人中心',
        path: '/user',
    }, {
        title: '退出登录',
        path: '/logout',
    }
])
const userStore = useUserStore()
menu.value.push(...userStore.menu);
const handleButtonClick = e => {
    navigate('/user/login')
};
const handleMenuClick = e => {
    if(e.key == '/logout') {
        logout();
        return
    }
    router.push(e.key);
};
// 退出登录
const logout = () => {
    storage.remove(storage.USER_TOKEN);
    navigate('/user/login')
}

</script>
