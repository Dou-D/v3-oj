<template>
  <Toast />
  <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination" :size="small">
    <template #bodyCell="{ record, column }">
      <template v-if="column.dataIndex === 'title'">
        <!-- Uses router-link to navigate to the question detail page -->
        <router-link :to="`/problem?id=${record.id}`">{{
          record.title
        }}</router-link>
      </template>
      <template v-else-if="column.dataIndex === 'passing_rate'">
        <a-progress
          :percent="record.passing_rate"
          size="large"
          status="active"
        />
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { GetExamQuestionAPI } from "@/services/match";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const dataSource = ref([
  {
    id: 3,
    title: "第金自手往有",
    passing_rate: "100"
  },
  {
    id: 8,
    title: "养学目科入此",
    passing_rate: "60"
  },
  {
    id: 22,
    title: "美清值么战",
    passing_rate: "3"
  },
]);
const loading = ref(true);

// Define table columns
const columns = [
  { title: "题号", dataIndex: "id", width: "120"},
  { title: "题目", dataIndex: "title", width: "150"},
  { title: "通过率", dataIndex: "passing_rate" },
];

// Pagination configuration
const pagination = ref({
  pageSize: 20, // Number of items per page
  current: 1, // Current page number
  total: 0, // Total number of items (to be fetched)
  onChange: (page) => fetchProblemListAPI(page),
});

// Fetch problems when component is mounted
onMounted(async () => {
  console.log(route.params);
});

// Fetch list of problems
async function fetchProblemListAPI(id) {
  const res = await GetExamQuestionAPI();
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
    return;
  }
  dataSource.value = res.data.data.question_list;
}
</script>
