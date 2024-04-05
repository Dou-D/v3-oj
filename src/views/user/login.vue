<template>
    <a-row class="a-row">
        <a-col :xs="20" :sm="16" :md="12" :lg="8">
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="Username" name="username"
                    :rules="[{ required: true, message: '请输入邮箱' }, emailRule]">
                    <a-input class="input" v-model:value="formState.username" />
                </a-form-item>

                <a-form-item label="Password" name="password"
                    :rules="[{ required: true, message: '请输入密码' }]">
                    <a-input-password class="input" v-model:value="formState.password" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">登录</a-button>
                    <a-button type="primary" html-type="submit">注册</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>


</template>
<script setup>
import { reactive } from 'vue';
const formState = reactive({
    username: '',
    password: '',
});
const emailRule = {
  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  message: '请输入有效的电子邮件地址',
};
const onFinish = values => {
    console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
    throw Error(err)
};
</script>

<style scoped>
.a-row {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 视窗高度 */
}

.input {
    max-width: 20vh;
    width: 100%;
}
</style>
