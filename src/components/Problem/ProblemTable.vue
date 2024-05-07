<template>
  <Toast />
  <a-space class="flex justify-end">
    <a-input
      placeholder="搜索题目"
      v-model:value="searchTitle"
      style="width: 10rem"
      @keyup.enter="handleSearch"
    />
    <el-select
      v-model="selectedTag"
      clearable
      placeholder="Select"
      style="width: 10rem"
      @change="handleSearch"
    >
      <el-option
        v-for="item in tagOptions"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
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
</template>
<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: end;
}
</style>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { fetchProblemList } from "@/services/problem";

const toast = useToast();
const dataSource = ref();
const loading = ref(true);
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
];

const searchTitle = ref("");
const selectedTag = ref(null);
const tagOptions = ref(["DP", "语法"]);

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40"],
  total: 0,
  showTotal: total => `Total ${total}`,
  onChange: (currentPage, pageSize) => {
    changeRoute(currentPage, pageSize);
  },
});

const handleSearch = () => {
  ProblemListAPI(pagination.currentPage, pagination.pageSize, searchTitle.value, selectedTag.value);
};

const changeRoute = (currentPage, pageSize) => {
  pagination.currentPage = currentPage;
  pagination.pageSize = pageSize;
  ProblemListAPI(currentPage, pageSize, searchTitle.value, selectedTag.value);
};

onMounted(() => {
  changeRoute(pagination.currentPage, pagination.pageSize);
});

const ProblemListAPI = async (currentPage, pageSize, search_title, search_tag) => {
  const params = {
    page: currentPage,
    number: pageSize,
    search_title: search_title || null,
    search_tag: search_tag || null,
  };
  try {
    const res = await fetchProblemList(params);
    if (res.data.code !== 200) {
      toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
      return;
    }
    dataSource.value = res.data.data.question_list;
    pagination.total = res.data.data.total * currentPage;
    toast.add({ severity: "success", summary: res.data.msg, life: 3000 });
  } catch (error) {
    toast.add({ severity: "error", summary: error.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};
</script>
