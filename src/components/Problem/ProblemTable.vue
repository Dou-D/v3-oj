<!-- <template>
  <Toast />
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
</template> -->
<template>
  <Toast />
  <el-table :data="tableData" style="width: 100%" size="large">
    <el-table-column label="题号" prop="id" />
    <el-table-column label="题目">
      <template #default="scope">
        <router-link :to="'/problem?id=' + scope.row.id">{{
          scope.row.title
        }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="标签">
      <template #header>
        <el-select
          v-model="tag"
          clearable
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #default="scope">
        <a-tag color="blue" size="large">{{ scope.row.tag }}</a-tag>
      </template>
    </el-table-column>
    <el-table-column label="难度" prop="degree">
      <template #default="scope">
        <a-rate v-model:value="scope.row.degree" disabled />
      </template>
    </el-table-column>
    <el-table-column label="通过率" prop="passing_rate">
      <template #default="scope">
        <el-progress
          :text-inside="true"
          :stroke-width="22"
          :percentage="scope.row.passing_rate"
          status="warning"
        />
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="large"
          placeholder="Type to search"
          @keydown.enter="handleSearch"
        />
      </template>
    </el-table-column>
  </el-table>
  <a-pagination
    class="pagination"
    v-model:current="current"
    v-model:pageSize="pageSize"
    show-size-changer
    :total="tableData.length"
    @change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { fetchProblemList } from "@/services/problem";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();

// 标签查询
const tag = ref();
const options = [
  {
    value: "DP",
    label: "DP",
  },
  {
    value: "背包问题",
    label: "背包问题",
  },
  {
    value: "语法",
    label: "语法",
  },
];
// 题目查询
const search = ref("");

// 分页
const current = ref(1);
const pageSize = ref(20);
const handleSearch = () => {
  changeRoute(current.value, pageSize.value, search.value, tag.value);

};
const handlePageChange = (page, pageSize) => {
  changeRoute(page, pageSize, search.value);  // 确保传递当前搜索值
};
const tableData = ref([]);
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
const handleProblemList = async (page, number, search_title = "", search_tag) => {
  console.log(search_tag, "tag");
  
  const res = await fetchProblemList({page, number, search_title, search_tag});
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  tableData.value = res.data.data.question_list;
};
const changeRoute = (page, number, search_title, search_tag) => {
  current.value = page;
  pageSize.value = number;
  handleProblemList(page, number, search_title, search_tag);
};

onMounted(() => {
  handleProblemList(1, 10);
});


</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: end;
}
</style>
<!-- <script setup>
import { ref, onMounted, onUnmounted } from "vue";
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
import EventBus from "@/utils/eventBus";

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

// 分页逻辑
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
const route = useRoute();
onMounted(() => {
  changeRoute(pagination.page, pagination.number);
  ProblemListAPI();
});
/**
 * 更改页码 切换路由
 * @param {*} number
 * @param {*} page
 */
const changeRoute = (number, page, search_title) => {
  pagination.number = number;
  pagination.page = page;
  ProblemListAPI(page, number, search_title);
};

/**
 * 获取题目列表
 */
const ProblemListAPI = async (page, number, search_title) => {
  const res = await fetchProblemList({
    page,
    number,
    search_title: search_title,
  });
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    // return
  }
  loading.value = false;
  dataSource.value = res.data.data.question_list;
};

EventBus.on("searchProblem", (val) => {
  changeRoute(pagination.number, pagination.page, val);
});
</script> -->
