<template>
  <Toast />
  <a-button type="primary" @click="createCompetition">创建比赛</a-button>
  <a-button type="default" @click="showDialog = true">添加成员</a-button>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
    :rowSelection="rowSelection"
    :loading="loading"
    rowKey="id"
  >
    <template v-slot:bodyCell="{ record, column, index }">
      <template v-if="column.dataIndex === 'tag'">
        <a-tag color="#2db7f5" v-for="tag in record.tag" :key="tag">{{
          tag
        }}</a-tag>
      </template>
      <template v-else-if="column.dataIndex === 'title'">
        <router-link :to="`problem?id=${record.id}`">{{
          record.title
        }}</router-link>
      </template>
      <template v-else-if="column.dataIndex === 'degree'">
        <a-rate :value="record.degree" disabled />
      </template>
      <template v-else-if="column.dataIndex === 'passing_rate'">
        <a-progress
          :percent="record.passing_rate"
          size="small"
          status="active"
        />
      </template>
    </template>
  </a-table>
  <Dialog v-model:visible="showDialog" modal header="新增成员" :style="{ width: '30rem' }">
    <div class="p-fluid">
      <a-table
        :columns="studentColumns"
        :dataSource="studentDataSource"
        :rowSelection="studentRowSelection"
        rowKey="studentId"
        pagination={false}
      ></a-table>
    </div>
    <div class="dialog-footer">
      <a-button @click="showDialog = false">取消</a-button>
      <a-button type="primary" @click="confirmSelection">确认</a-button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchProblemList } from "@/services/problem";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
const route = useRoute();

const toast = useToast();
const dataSource = ref();
const selectedRowKeys = ref([]);
const loading = ref(true)
const rowSelection = {
  onChange: (newSelectedRowKeys) => {
    selectedRowKeys.value = newSelectedRowKeys;
  },
};

const columns = [
  {
    title: "题号",
    dataIndex: "id",
    width: "20%",
  },
  {
    title: "题目",
    dataIndex: "title",
    width: "30%",
  },
  {
    title: "标签",
    dataIndex: "tag",
    width: "20%",
  },
  {
    title: "难度",
    dataIndex: "degree",
    width: "20%",
  },
  {
    title: "通过率",
    dataIndex: "passing_rate",
    width: "30%",
  },
];

//
/**
 * 分页逻辑
 * @param {*} number
 * @param {*} page
 */
// TODO: 分页
// #region
const changeRoute = (number, page) => {
  const query = {
    ...route.query,
    page: page,
    number: number,
  };
  ProblemListAPI(query.page, query.number);
};
const pagination = {
  page: 20, // 默认每页显示数量
  number: 1, // 当前页数
  showSizeChanger: true, // 显示可改变每页数量
  pageOptions: ["20", "30", "40"], // 每页数量选项
  showTotal: (total) => `Total ${total}`, // 显示总数
  onChange(page, number) {
    changeRoute(number, page);
  },
};
// #endregion
// TODO: 获取题目列表
// #region
onMounted(() => {
  changeRoute(pagination.page, pagination.number);
  ProblemListAPI();
});
const ProblemListAPI = async (page, number) => {
  const res = await fetchProblemList({ page, number });
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  loading.value = false;
  dataSource.value = res.data.data.question_list;
};
// #endregion
// TODO: 添加比赛成员
// #region
const showDialog = ref(false);
const selectedStudentKeys = ref([]);

const studentRowSelection = {
  onChange: (selectedKeys) => {
    selectedStudentKeys.value = selectedKeys;
  },
  type: 'checkbox'  // 允许多选
};

const studentColumns = [
  { title: "学生姓名", dataIndex: "name" },
  { title: "学号", dataIndex: "studentId" }
];

// 假设学生数据是固定的，实际情况可能需要从后端获取
const studentDataSource = ref([
  { name: "张三", studentId: "001" },
  { name: "李四", studentId: "002" }
]);

const confirmSelection = () => {
  // 这里可以处理选中学生的逻辑，例如发送请求到后端
  console.log(selectedStudentKeys.value);
  showDialog.value = false;
};
// #endregion

// TODO: 创建比赛
const createCompetition = () => {
  if (selectedRowKeys.value.length === 0) {
    toast.add({ severity: "warn", summary: "请选择题目", life: 3000 });
    return;
  }
  if(selectedStudentKeys.value.length === 0) {
    toast.add({ severity: "warn", summary: "请选择学生", life: 3000 });
    return;
  }
  // 这里可以添加创建比赛的逻辑，例如发送请求到后端
};
</script>
