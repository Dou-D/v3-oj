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
      <!-- 操作列 -->
      <template v-else-if="column.dataIndex === 'action'">
        <div>
          <a-button type="primary" @click="editRecord(record.id)">Edit</a-button>
          <a-button type="danger" @click="deleteRecord(record.id)">Delete</a-button>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { fetchProblemList, fetchProblemDelete } from '@/services/problem';

const toast = useToast();
const loading = ref(true);
const dataSource = ref([]);
const searchTitle = ref("");
const selectedTag = ref(null);
const tagOptions = ref(['DP', '语法']); // 示例标签

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40"],
  showTotal: (total) => `Total ${total}`,
  onChange: (current, pageSize) => {
    fetchData(current, pageSize);
  },
});

const fetchData = async (current, pageSize) => {
  const params = {
    page: current,
    number: pageSize,
    search_title: searchTitle.value || null,
    search_tag: selectedTag.value || null,
  };
  try {
    const res = await fetchProblemList(params);
    if (res.data.code !== 200) {
      toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
      return;
    }
    dataSource.value = res.data.data.question_list;
    pagination.total = res.data.data.total * current;
    pagination.current = current;
    pagination.pageSize = pageSize;
    toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: error.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  fetchData(1, pagination.pageSize); // 搜索时始终返回第一页
};

onMounted(() => {
  fetchData(pagination.current, pagination.pageSize);
});

const columns = [
  { title: "题号", dataIndex: "id", width: "10%" },
  { title: "题目", dataIndex: "title", width: "30%" },
  { title: "标签", dataIndex: "tag", width: "10%" },
  { title: "难度", dataIndex: "degree", width: "12%" },
  { title: "通过率", dataIndex: "passing_rate", width: "12%" },
  { title: "操作", dataIndex: "action", width: "16%" },
];

function editRecord(id) {
  console.log("Editing record with id:", id);
  window.location.href = `/console/addproblem?id=${id}`;
}

async function deleteRecord(id) {
  const res = await fetchProblemDelete(id);
  if (res.data.code !== 200) {
    toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
    return;
  }
  toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
  fetchData(pagination.current, pagination.pageSize); // 删除后刷新当前页
}
</script>
