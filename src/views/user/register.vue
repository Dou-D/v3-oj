<template>
    <Toast />
    <a-row type="flex" justify="center" align="middle" style="min-height: 100vh;">
        <a-col :span="8" style="text-align: center;">
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <!-- Username -->
                <a-form-item label="Username" name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]">
                    <a-input v-model:value="formState.username" show-count placeholder="输入用户名">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <!-- Password -->
                <a-form-item label="Password" name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" show-count placeholder="输入密码">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <!-- Email -->
                <a-form-item label="Email" name="email" :rules="[
            { required: true, message: 'Please input your email!' },
            { pattern: emailRegex, message: 'Please enter a valid email!' }
        ]">
                    <a-input v-model:value="formState.email" placeholder="Email">
                        <template #prefix>
                            <MailOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <!-- Verification Code -->
                <a-form-item label="Verification Code"
                    :rules="[{ required: true, message: 'Please input the verification code!' }]">
                    <a-input-group compact>
                        <a-input v-model:value="formState.verify_code" style="width: calc(100% - 200px)" />
                        <a-button type="primary" :disabled="countdown > 0" @click="handleGetVerificationCode">
                            {{ countdown > 0 ? `${countdown} 秒` : '获取验证码' }}
                        </a-button>
                    </a-input-group>
                </a-form-item>

                <!-- Submit -->
                <a-form-item>
                    <a-button @click="handleGetRegistration" :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                        Register
                    </a-button>
                    Or
                    <RouterLink to="/login">
                        <a-button type="default">login now!</a-button>
                    </RouterLink>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup>
import { getRegisterAPI, getVerificationCodeAPI } from '@/services/user'
import { RouterLink } from 'vue-router';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { reactive, computed, ref } from 'vue';
// primevue toast配置
import { useToast } from 'primevue/usetoast';
const toast = useToast();
// 邮箱正则验证
const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // 简单的邮箱正则表达式

// 表单数据
const formState = reactive({
    username: '',
    password: '',
    email: '',
    verify_code: '',
});
function handleGetRegistration() {
    const res = getRegisterAPI(formState)
    if (res.data.code !== 200) {
        toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
        return
    }
    toast.add({ severity:'success', summary: '注册成功', life: 3000 });
    formState.username = '';
    formState.password = '';
    formState.email = '';
    formState.verify_code = '';
}
const countdown = ref(0);

const onFinish = values => {
    console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

// 点击获取验证码
const handleGetVerificationCode = async () => {
    const res = getVerificationCodeAPI()
    if (res.data.code !== 200) {
        toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
        return
    }
    countdown.value = 60;
    const interval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(interval);
        }
    }, 1000);
};

// 更新disabled计算属性
const disabled = computed(() => {
    // 检查所有输入框是否非空且邮箱格式是否正确
    return !(formState.username && formState.password && emailRegex.test(formState.email) && formState.verify_code && countdown.value <= 0);
});
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

.ant-form-item-label {
    text-align: left;
}
</style>