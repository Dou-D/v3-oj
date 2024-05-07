<template>
  <Toast />
  <a-row type="flex" justify="center" align="middle" style="min-height: 100vh">
    <a-col :span="8" style="text-align: center">
      <a-form :model="formState" name="normal_login" class="login-form">
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input
            v-model:value="formState.username"
            show-count
            placeholder="输入用户名或者邮箱"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            show-count
            placeholder="输入密码"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-flex :justify="'center'" :align="center">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
            <a class="login-form-forgot" href="">忘记密码？</a>
          </a-flex>
        </a-form-item>

        <a-form-item>
          <a-button
            @click="handleLogin"
            @keydown.enter="handleLogin"
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <RouterLink to="/register">
            <a-button type="primary">注册</a-button>
          </RouterLink>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, computed, ref } from "vue";
import { getLoginAPI } from "@/services/user.js";
// primevue toast
import { useToast } from "primevue/usetoast";
import { useUserStore } from '@/stores/user'

import storage from "@/services/storage";
const router = useRouter();

const userStore = useUserStore();
const toast = useToast();
if (userStore.identity) {
  router.replace("/")
}
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

// 开始登录
const handleLogin = async () => {
  const res = await getLoginAPI({
    username: formState.username,
    password: formState.password,
  });
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  toast.add({ severity: "success", summary: res.data.msg, life: 3000 });

  storage.set(storage.USER_TOKEN, res.data.data.token);
  router.replace("/");
};
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
