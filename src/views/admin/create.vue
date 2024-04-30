<template>
    <Toast />
    <a-button type="primary" @click="createCompetition">创建比赛</a-button>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :rowSelection="rowSelection"
      rowKey="id"
    >
      <template v-slot:bodyCell="{ record, column, index }">
        <template v-if="column.dataIndex === 'tag'">
          <a-tag color="#2db7f5" v-for="tag in record.tag" :key="tag">{{ tag }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'title'">
          <router-link :to="`problem?id=${record.id}`">{{ record.title }}</router-link>
        </template>
        <template v-else-if="column.dataIndex === 'degree'">
          <a-rate :value="record.degree" disabled />
        </template>
        <template v-else-if="column.dataIndex === 'passing_rate'">
          <a-progress :percent="record.passing_rate" size="small" status="active" />
        </template>
      </template>
    </a-table>
  </template>
  
<script setup>
import { ref, onMounted } from "vue";
import { fetchProblemList } from "@/services/problem";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
const toast = useToast();
const dataSource = ref();
const selectedRowKeys = ref([]);

const rowSelection = {
  onChange: (selectedRowKeys) => {
    selectedRowKeys.value = selectedRowKeys;
  },
};

const columns = [
  {
    title: '题号',
    dataIndex: 'id',
    width: '20%',
  },
  {
    title: '题目',
    dataIndex: 'title',
    width: '30%',
  },
  {
    title: '标签',
    dataIndex: 'tag',
    width: '20%',
  },
  {
    title: '难度',
    dataIndex: 'degree',
    width: '20%',
  },
  {
    title: '通过率',
    dataIndex: 'passing_rate',
    width: '30%',
  },
];


const createCompetition = () => {
  if (selectedRowKeys.value.length === 0) {
    toast.add({ severity: "warn", summary: "请选择题目", life: 3000 });
    return;
  }
  // 这里可以添加创建比赛的逻辑，例如发送请求到后端
  console.log("Selected problems for competition:", selectedRowKeys.value);
};
//
/**
 * 分页逻辑
 * @param {*} number 
 * @param {*} page 
 */
const changeRoute = (number, page) => {
  const query = {
    ...route.query,
    page: page,
    number: number  
  };
  ProblemListAPI(query.page, query.number)
}
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
const route = useRoute();
/**
 * 获取题目列表
 */
 onMounted(() => {
  changeRoute(pagination.page, pagination.number)
  ProblemListAPI();
});
 const ProblemListAPI = async (page, number) => {
  const res = await fetchProblemList({ page, number });
  if (res.data.code != 200) {
    toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
    return
  }
  dataSource.value = res.data.data.question_list
}
</script>
