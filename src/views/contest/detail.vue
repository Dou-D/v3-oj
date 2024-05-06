<template>
  <Toast />
  <a-space class="flex justify-end">
    <div v-if="userStore.identity ==='admin'">
      <a-button type="primary" @click="showDetailModal">查看详情</a-button>
      <a-button @click="showAddQuestionModal">添加题目</a-button>
    </div>

    <!-- Detail Modal -->
    <a-modal
      v-model:open="openDetailModal"
      title="学生信息"
      @ok="handleDetailOk"
    >
      <a-table
        :columns="studentColumns"
        :dataSource="detailData"
        :pagination="false"
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.dataIndex === 'id'">
            {{ record.id }}
          </template>
          <template v-else-if="column.dataIndex === 'username'">
            {{ record.username }}
          </template>
          <template v-else-if="column.dataIndex === 'status'">
            <a-tag :color="record.status === 'pass' ? 'green' : 'red'">{{
              record.status
            }}</a-tag>
          </template>
        </template>
      </a-table>
    </a-modal>

    <!-- Add Question Modal -->
    <a-modal
      v-model:open="openAddQuestionModal"
      title="新增题目"
      @ok="handleAddQuestion"
    >
      <a-select
        v-model:value="newQuestion.options"
        mode="multiple"
        style="width: 100%"
        placeholder="请选择题目选项"
        :options="selectOptions"
      ></a-select>
    </a-modal>
  </a-space>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
    :size="small"
    :loading="loading"
  >
    <template #bodyCell="{ record, column }">
      <template v-if="column.dataIndex === 'title'">
        <router-link :to="`/problem?id=${record.id}`">{{
          record.title
        }}</router-link>
      </template>
      <template v-else-if="column.dataIndex === 'passing_rate'">
        <a-progress
          :percent="Number(record.passing_rate)"
          size="large"
          status="active"
        />
      </template>
    </template>
  </a-table>
</template>

<script setup>
// 引入Vue相关的功能和API请求服务
import { ref, onMounted } from "vue";
import {
  GetExamQuestionAPI,
  GetInspectAPI,
  GetAddQuestionAPI,
} from "@/services/match";
import { fetchProblemList } from "@/services/problem";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from '@/stores/user'
// 初始化通知（toast）服务和路由
const toast = useToast();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
// 初始化组件的响应式数据
const dataSource = ref([]);
const loading = ref(true);
const newQuestion = ref({ options: [] });
const selectOptions = ref([]);
fetchProblemList({ page: 0, number: 0 })
  .then((res) => {
    selectOptions.value = res.data.data.question_list.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  })
  .catch((err) => {
    console.log(err);
    toast.add({ severity: "error", summary: err.data.msg, life: 3000 });
  });
// 定义表格的列配置
const columns = [
  { title: "题号", dataIndex: "id", width: "120" },
  { title: "题目", dataIndex: "title", width: "150" },
  { title: "通过率", dataIndex: "passing_rate" },
];

// 分页配置
const pagination = ref({
  pageSize: 20,
  current: 1,
  total: 0,
  onChange: (page) => fetchProblemListAPI(page),
});

// 组件挂载时执行的操作
onMounted(() => {
  const id = route.params.id;
  fetchProblemListAPI(id);
});

// 从后端API获取问题列表的函数
async function fetchProblemListAPI(id) {
  const res = await GetExamQuestionAPI(id);
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  dataSource.value = res.data.data.question_list;
  loading.value = false;
}

// 用于控制模态框开关的状态
const openDetailModal = ref(false);
const openAddQuestionModal = ref(false);

// 显示添加题目模态框的函数
const showAddQuestionModal = () => {
  openAddQuestionModal.value = true;
};

// 处理添加题目请求的函数
const handleAddQuestion = async () => {
  const id = parseInt(route.params.id);
  const res = await GetAddQuestionAPI(newQuestion.value.options, id);
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  location.reload();
  toast.add({ severity: "success", summary: res.data.msg, life: 3000 });
  openAddQuestionModal.value = false;
};

// 处理查看详情模态框确定按钮的函数
const handleDetailOk = () => {
  openDetailModal.value = false;
};

// 学生状态
const studentColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "用户名", dataIndex: "username", key: "username" },
  { title: "状态", dataIndex: "status", key: "status" },
];
const detailData = ref([]);
// 显示详情模态框的函数
const showDetailModal = () => {
  openDetailModal.value = true;
  handleInspect();
};
const handleInspect = async () => {
  const id = parseInt(route.params.id);
  const res = await GetInspectAPI(id);
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  detailData.value = res.data.data.student;
};
</script>
