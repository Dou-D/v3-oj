<template>
  <Toast />
  <a-space class="flex justify-end">
    <a-input
      placeholder="搜索题目"
      v-model:value="searchTitle"
      style="width: 10rem;"
      @keyup.enter="handleSearch"
    />
    <a-select
    v-model:value="selectedTag"
      placeholder="Select a tag"
      @change="handleSearch"
    >
      <a-select-option v-for="tag in tagOptions" :value="tag" :key="tag">
        {{ tag }}
      </a-select-option>
    </a-select>
  </a-space>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
    :loading="loading"
  >
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
import { fetchProblemList, fetchProblemDelete } from '@/services/problem'
import { useToast } from 'primevue/usetoast';

const loading = ref(true);
const dataSource = ref([]);
const searchTitle = ref("");
const selectedTag = ref(null);
const tagOptions = ref(['DP', '语法']); // 示例标签
const toast = useToast()
// Pagination settings remain unchanged
const pagination = ref({
  pageSize: 20, // 默认每页显示数量
  current: 1, // 当前页数
  showSizeChanger: true, // 显示可改变每页数量
  pageSizeOptions: ['10', '30', '50'], // 每页数量选项
  showTotal: total => `Total ${total} items`, // 显示总数
  onChange: handlePaginationChange,
});

function handlePaginationChange(page = pagination.value.current, pageSize = pagination.value.pageSize) {
  pagination.value.current = page;
  pagination.value.pageSize = pageSize;
  fetchData(page, pageSize);
}

const fetchData = async (page, pageSize) => {
  loading.value = true;
  if(!searchTitle.value) {
    searchTitle.value = null
  }
  if(!selectedTag.value) {
    selectedTag.value = null
  }
  const params = {
    page: page,
    number: pageSize,
    search_title: searchTitle.value,
    search_tag: selectedTag.value,
  };
  const res = await fetchProblemList(params);
  if (res.data.code !== 200) {
    toast.add({ severity: 'error', summary: res.data.msg, life: 3000 })
    return
  } 
  dataSource.value = res.data.data.question_list;
  loading.value = false;
};

const handleSearch = () => {
  handlePaginationChange(pagination.value.current, pagination.value.pageSize);
};

onMounted(() => {
  handlePaginationChange(pagination.value.current, pagination.value.pageSize);
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

async function deleteRecord(id) {
  const res = await fetchProblemDelete(id)
  if(res.data.code !== 200) {
    console.log(111);
    toast.add({ severity: 'error', summary: 1111, life: 3000 })
    return
  }
  toast.add({ severity:'success', summary: res.data.msg, life: 3000 })
  handlePaginationChange()
}
</script>
