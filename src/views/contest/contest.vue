<template>
  <!-- <a-button type="primary" >Add</a-button> -->

  <div>
    <a-modal
      v-model:visible="modalVisible"
      title="Add New Competition"
      @ok="handleAdd"
      @cancel="handleCancel"
    >
      <a-form model="newCompetition">
        <a-form-item label="Competition Name">
          <a-input v-model="newCompetition.name"></a-input>
        </a-form-item>
        <a-form-item label="Students">
          <a-select
            mode="multiple"
            style="width: 100%"
            placeholder="Select students"
            v-model="newCompetition.students"
          >
            <a-select-option v-for="student in allStudents" :key="student">{{
              student
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <div>
      <a-button type="dashed" @click="showModal" v-if="userStore.identity === 'admin'">新增比赛</a-button>
    </div>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
      @change="handleTableChange"
    >
    </a-table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GetExamListAPI, GetAddExamAPI } from "@/services/match";
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// 使用 Vue Router 的钩子函数来访问路由和路由器实例
const route = useRoute();
const router = useRouter();

// 定义数据源数组，存储比赛列表
const dataSource = ref([]);

// 加载
const loading = ref(true);

// 控制模态框的显示状态
const modalVisible = ref(false);

// 定义新比赛的响应式对象，用于模态框表单绑定
const newCompetition = reactive({ name: "", students: [] });

// 示例学生列表，用于模态框中选择参赛学生
const allStudents = ref(["Alice", "Bob", "Charlie"]);

// 定义分页信息的响应式对象
const pagination = reactive({
  current: 1, // 当前页码
  pageSize: 10, // 每页显示的记录数
  total: 0, // 总记录数
});

// 表格列定义
const columns = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  { title: "Student", dataIndex: "Student" },
  { title: "Question", dataIndex: "Question" },
];

//
const handleGetExamList = async (current, pageSize) => {
  // 调用API获取比赛列表数据
  const res = await GetExamListAPI(current, pageSize);
};

// 处理表格分页变化的函数
const handleTableChange = async (pagination) => {
  // 调用API获取分页数据
  const res = await handleGetExamList(pagination.current, pagination.pageSize);
};

// 显示添加新比赛的模态框
const showModal = () => {
  modalVisible.value = true;
};

// 处理添加新比赛的操作
const handleAdd = async () => {
  // 调用后端API添加新比赛，关闭模态框，并清空表单
  const { data } = await GetAddExamAPI(
    newCompetition.students,
    newCompetition.name
  );
  modalVisible.value = false;
  newCompetition.name = "";
  newCompetition.students = [];
  // 刷新表格数据
  const res = await handleGetExamList(pagination.current, pagination.pageSize);
};

// 处理取消添加新比赛的操作，关闭模态框
const handleCancel = () => {
  modalVisible.value = false;
};

// 组件挂载时调用，用于首次加载数据
onMounted(async () => {
  const res = await handleGetExamList(pagination.current, pagination.pageSize);
});
</script>
