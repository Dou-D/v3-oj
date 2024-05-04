<template>
  <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination" :loading="loading">
    <template #bodyCell="{ record, column }">
      <template v-if="column.dataIndex === 'tag'">
        <a-tag color="#2db7f5" v-for="tag in record.tag" :key="tag">{{
          tag
        }}</a-tag>
      </template>
      <template v-else-if="column.dataIndex === 'title'">
        <router-link :to="`/problem?id=${record.id}`">{{
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
      <!-- 操作列 -->
      <template v-else-if="column.dataIndex === 'action'">
        <div>
          <a-button type="primary" @click="editRecord(record.id)"
            >Edit</a-button
          >
          <a-button type="danger" @click="deleteRecord(record.id)"
            >Delete</a-button
          >
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchProblemList } from '@/services/problem'
const loading = ref(true)
const dataSource = ref([]);

const pagination = {
  page: 20, // 默认每页显示数量
  number: 1, // 当前页数
  showSizeChanger: true, // 显示可改变每页数量
  pageOptions: ['20', '30', '40'], // 每页数量选项
  showTotal: total => `Total ${total}`, // 显示总数
  onChange(page, number) {
    changeRoute(number, page)
  }
}
const changeRoute = (number, page, search_title) => {
  pagination.number = number
  pagination.page = page
  ProblemListAPI(page, number, search_title)
}
const ProblemListAPI = async (page, number) => {
  const res = await fetchProblemList({ page, number });
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  loading.value = false;
  dataSource.value = res.data.data.question_list;
};
onMounted(() => {
  changeRoute(pagination.page, pagination.number)
  ProblemListAPI();
});
const columns = [
  {
    title: "题号",
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "题目",
    dataIndex: "title",
    width: "30%",
  },
  {
    title: "标签",
    dataIndex: "tag",
    width: "10%",
  },
  {
    title: "难度",
    dataIndex: "degree",
    width: "12%",
  },
  {
    title: "通过率",
    dataIndex: "passing_rate",
    width: "12%",
  },
  // 操作列
  {
    title: "操作",
    width: "16%",
    dataIndex: "action", // 这个不是必须的，但是要保持与模板中的对应
  },
];

function editRecord(id) {
  console.log("Editing record with id:", id);
  // 实现编辑跳转逻辑
  window.location.href = `/console/addproblem?id=${id}`;
}

function deleteRecord(id) {
  console.log("Deleting record with id:", id);
  // 实现删除逻辑
}
</script>
