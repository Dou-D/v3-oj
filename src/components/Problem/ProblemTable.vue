<template>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="false">
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
import { ref } from 'vue';
import { MailOutlined, UserOutlined, BookOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

// 示例数据，实际项目中应从后端获取
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
for(let i = 0;i < 20;i++){
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
</script>