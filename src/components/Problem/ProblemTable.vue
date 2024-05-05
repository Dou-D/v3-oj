<template>
  <Toast />
  <a-space class="flex justify-end">
    <a-input
      placeholder="搜索题目"
      v-model:value="searchTitle"
      style="width: 10rem;"
      @keyup.enter="handleSearch"
    />
    <el-select
      v-model="selectedTag"
      clearable
      placeholder="Select"
      style="width: 10rem;"
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
import {
  MailOutlined,
  UserOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons-vue";
import { fetchProblemList } from "@/services/problem";
// 示例数据，实际项目中应从后端获取
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";

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
    // 自定义渲染难度评分组件
  },
  {
    title: "通过率",
    dataIndex: "passing_rate",
    width: "12%",
  },
];

// 搜索
const searchTitle = ref("");
const selectedTag = ref(null);
const tagOptions = ref(["DP", "语法"]); // 示例标签
const handleSearch = () => {
  ProblemListAPI(
    pagination.page,
    pagination.number,
    searchTitle.value,
    selectedTag.value
  );
};
// 分页逻辑
const pagination = reactive({
  page: 10, // 默认每页显示数量
  number: 1, // 当前页数
  showSizeChanger: true, // 显示可改变每页数量
  pageOptions: ["20", "30", "40"], // 每页数量选项
  showTotal: (total) => `Total ${total}`, // 显示总数
  onChange: (current, pageSize) => {
    changeRoute(current, pageSize);
  },
})
const route = useRoute();
/**
 * 更改页码 切换路由
 * @param {*} number
 * @param {*} page
 */
const changeRoute = (number, page) => {
  pagination.number = number;
  pagination.page = page;
  ProblemListAPI(page, number, searchTitle.value, selectedTag.value);
};
onMounted(() => {
  changeRoute(pagination.page, pagination.number);
});
/**
 * 获取题目列表
 */
const ProblemListAPI = async (page, number, search_title, search_tag) => {
  // Assuming search_title and search_tag are directly usable and correctly defined as ref()
  const params = {
    page,
    number,
    search_title: search_title || null,
    search_tag: search_tag || null,
  };
  console.log("params: ", params);
  try {
    const res = await fetchProblemList(params);
    if (res.data.code != 200) {
      throw new Error(res.data.msg);
    }
    dataSource.value = res.data.data.question_list;
  } catch (error) {
    toast.add({ severity: "error", summary: error.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};
</script>
