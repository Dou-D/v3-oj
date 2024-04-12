<template>
  <Toast />
  <a-spin spinning="true" />
  <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination">
    <template #bodyCell="{ record, column }">
      <template v-if="column.dataIndex === 'tag'">
        <a-tag color="#2db7f5" v-for="tag in record.tag" :key="tag">{{ tag }}</a-tag>
      </template>
      <template v-else-if="column.dataIndex === 'title'">
        <router-link :to="`/problem?id=${record.id}`">{{ record.title }}</router-link>
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
import { ref, watch } from 'vue';
import { MailOutlined, UserOutlined, BookOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { fetchProblemList } from '@/services/problem'
// 示例数据，实际项目中应从后端获取
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const dataSource = ref([
  {
    "id": 0,
    "title": "Example Question",
    "tag": ["Array", "String"],
    "degree": 3,
    "passing_rate": 67
  }
  // 添加更多题目
]);
for (let i = 0; i < 20; i++) {
  dataSource.value.push({
    "id": i,
    "title": "Example Question",
    "tag": ["Array", "String"],
    "degree": 3,
    "passing_rate": 67
  })
}
const columns = [
  {
    title: '题号',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: '题目',
    dataIndex: 'title',
    width: '30%',
  },
  {
    title: '标签',
    dataIndex: 'tag',
    width: '10%',
    // 这里不需要宽度，让它自适应
  },
  {
    title: '难度',
    dataIndex: 'degree',
    width: '12%',
    // 自定义渲染难度评分组件
  },
  {
    title: '通过率',
    dataIndex: 'passing_rate',
    width: '12%',
  },
];

// 分页逻辑
const pagination = {
  pageSize: 20, // 默认每页显示数量
  pageCurrent: 1, // 当前页数
  showSizeChanger: true, // 显示可改变每页数量
  pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
  showTotal: total => `Total ${total}`, // 显示总数
  onChange(page, pageSize) {
    this.pageSize = pageSize
    this.pageCurrent = page
    ProblemListAPI()
  }
}
const ProblemListAPI = async () => {
  const res = await fetchProblemList({ page: pagination.pageCurrent, number: pagination.pageSize })
  if (res.data.code != 0){
    toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
    return
  }
  dataSource.value = res.data.data.question_list
}

fetchProblemList({ page: Number(pagination.pageCurrent), number: Number(pagination.pageSize) })
  .then(res => {
    dataSource.value = res.data.data.question_list
  })
  .catch(err => {
    toast.add({ severity: 'error', summary: err.data.msg, life: 3000 });
    return
  })
</script>