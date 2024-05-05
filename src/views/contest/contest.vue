<template>
  <Toast />
  <div>
    <a-modal
      v-model:visible="modalVisible"
      title="新增比赛"
      @ok="handleAdd"
      @cancel="handleCancel"
    >
      <a-form model="newCompetition">
        <a-form-item label="比赛名称">
          <a-input v-model:value="newCompetition.name"></a-input>
        </a-form-item>
        <a-form-item label="参与人员">
          <a-select
            mode="multiple"
            style="width: 100%"
            placeholder="Select students"
            v-model:value="newCompetition.students"
          >
            <a-select-option v-for="student in allStudents" :key="student">{{
              student
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
      @change="handleTableChange"
      :loading="loading"
    >
      <template #title>
        <a-button
          class="btn"
          type="dashed"
          @click="showModal"
          v-if="userStore.identity === 'admin'"
          >新增比赛</a-button
        >
      </template>
      <template #bodyCell="{ record, column }">
        <template
          v-if="column.dataIndex === 'action' && userStore.identity === 'admin'"
        >
          <a-button @click="handleAction(record.id)"> 查看详情 </a-button>
        </template>
        <template v-if="column.dataIndex === 'name'">
          <router-link :to="{ path: `/contest/detail/${record.id}` }">{{
            record.name
          }}</router-link>
        </template>
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GetExamListAPI, GetAddExamAPI, GetInspectAPI } from "@/services/match";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const dataSource = ref([]);
const loading = ref(true);
const modalVisible = ref(false);
const newCompetition = reactive({ name: "", students: [] });
const allStudents = ref([]);
allStudents.value = userStore.students
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const columns = [
  { title: "ID", dataIndex: "id" },
  { title: "比赛名称", dataIndex: "name" },
  { title: "参与人数", dataIndex: "student_num" },
  { title: "题目数量", dataIndex: "question_num" },
  {
    title: "操作",
    dataIndex: "action",
  },
];
async function handleGetExamList(current, pageSize) {
  const res = await GetExamListAPI(current, pageSize);
  if (res.data.code !== 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
  } else {
    dataSource.value = res.data.data.exam_list;
    toast.add({ severity: "success", summary: res.data.msg, life: 3000 });
  }
  loading.value = false;
}

function handleTableChange(pagination) {
  handleGetExamList(pagination.current, pagination.pageSize);
}

function showModal() {
  modalVisible.value = true;
}

async function handleAdd() {
  const res = await GetAddExamAPI(newCompetition.students, newCompetition.name);
  if (res.data.code !== 200) {
    toast.add({ severity: "error", summary: res.data.msg, life: 3000 });
  } else {
    toast.add({ severity: "success", summary: res.data.msg, life: 3000 });
    modalVisible.value = false;
    newCompetition.name = "";
    newCompetition.students = [];
    await handleGetExamList(pagination.current, pagination.pageSize);
  }
}

function handleCancel() {
  modalVisible.value = false;
}

// 详情
const handleAction = (id) => {
  router.push({ path: `/contest/detail/${id}` });
}
onMounted(() => {
  handleGetExamList(pagination.current, pagination.pageSize);
});
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  justify-self: start;
}
</style>
