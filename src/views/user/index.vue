<template>
  <a-row>
    <a-col :span="10" :offset="6">
      <a-descriptions bordered title="个人主页" size="large">
        <a-descriptions-item label="用户名">{{
          userStore.userInfo.username
        }}</a-descriptions-item>
        <a-descriptions-item label="注册时间">{{
          userStore.userInfo.startTime
        }}</a-descriptions-item>
        <a-descriptions-item label="提交题目">{{
          userStore.userInfo.submit
        }}</a-descriptions-item>
        <a-descriptions-item label="AC">{{
          userStore.userInfo.Accept
        }}</a-descriptions-item>
        <a-descriptions-item label="用户身份">{{
          userStore.identity
        }}</a-descriptions-item>
        <a-descriptions-item label="管理学生">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              Hover me
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item v-for="item in userStore.students">
                  {{ item }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
    
  </a-row>
  <a-card title="Card title" :bordered="false">
            <a-card-grid style="width: 25%; text-align: center"
              >Content</a-card-grid
            >
            <a-card-grid style="width: 25%; text-align: center"
              >Content</a-card-grid
            >
            <a-card-grid style="width: 25%; text-align: center"
              >Content</a-card-grid
            >
            <a-card-grid style="width: 25%; text-align: center"
              >Content</a-card-grid
            >
          </a-card>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import { DownOutlined } from "@ant-design/icons-vue";
const userStore = useUserStore();
</script>
