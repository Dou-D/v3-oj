<template>
  <Toast />
  <a-row>
    <a-col flex="1 1 200px">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
    </a-col>
    <a-col flex="0 1 300px">
      <a-dropdown-button @click="handleButtonClick">
        {{ userStore.userInfo.username }}
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
import { UserOutlined } from "@ant-design/icons-vue";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import storage from "@/services/storage";
import { useUserStore } from "@/stores/user";
const current = ref(["1"]);
const router = useRouter();
import { useToast } from "primevue/usetoast";
const toast = useToast();

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const items = props["items"];
const navigate = (path) => {
  router.push(path);
};

const menu = ref([
  {
    title: "个人中心",
    path: "/user",
  },
  {
    title: "退出登录",
    path: "/logout",
  },
]);
const userStore = useUserStore();
menu.value.push(...userStore.menu);
const handleButtonClick = (e) => {
  if (userStore.identity) {
    toast.add({ severity: "info", summary: "你已经登录了", life: 3000 });
    return;
  }
  navigate("/login");
};

// 退出登录
const logout = () => {
  router.replace("/login");
  userStore.deleteInfo();
  storage.remove(storage.USER_TOKEN);
};
const handleMenuClick = (e) => {
  if (e.key == "/logout") {
    logout();
    console.log(111)
    return;
  }
  router.push(e.key);
};

</script>
