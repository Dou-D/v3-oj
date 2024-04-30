<template>
  <Toast />
  <a-row gutter="{16}">
    <a-col :span="12">
      <a-card :title="title">
        <a-tag color="blue" v-for="item in tags">{{ item }}</a-tag>
        <!-- 假设题目信息是HTML格式，使用v-html渲染 -->
        <div v-html="questionInfo"></div>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="Monaco Editor" style="height: 100vh">
        <a-row>
          <a-col :span="8">
            <Cascader
              :options="optionsTheme"
              :defaultOption="'vs'"
              type="theme"
              @handleThemeItem="handleThemeItem"
            />
          </a-col>
          <a-col :span="8">
            <Button label="提交" severity="success" @click="uploadAnswer" />
          </a-col>
          <a-col :span="8">
            <Cascader
              :options="optionsLanguage"
              :defaultOption="'C'"
              type="language"
              @handleLanguageItem="handleLanguageItem"
            />
          </a-col>
        </a-row>
        <a-divider />
        <MonacoEditor :theme="theme" :language="language" @codeUpdate="handleCodeUpdate" />
      </a-card>
      <a-card title="输出信息">
        <!-- 输出信息和测试结果 -->
        <pre>{{ output }}</pre>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import Cascader from "@/components/Problem/Cascader.vue";
import { fetchProblemDetail, fetchUploadAnswer } from "@/services/problem";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
const toast = useToast();

/**
 * 选项配置
 */
const optionsLanguage = ref([
  {
    value: "C",
    label: "C",
  },
  {
    value: "cpp",
    label: "C++",
  },
  {
    value: "java",
    label: "Java",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
]);
const language = ref([
  {
    value: "C",
    label: "C",
  },
]);
const optionsTheme = ref([
  {
    value: "vs",
    label: "Visual Studio",
  },
  {
    value: "vs-dark",
    label: "Visual Studio Dark",
  },
  {
    value: "hc-black",
    label: "High Contrast Black",
  },
]);
const theme = ref([
  {
    value: "vs",
    label: "Visual Studio",
  },
]);
function handleLanguageItem(val) {
  language.value = val; // 假设val是选择的语言代码，如'javascript'
}
function handleThemeItem(val) {
  theme.value = val; // 假设val是选择的主题代码，如'vs-dark'
}
import MonacoEditor from "@/components/Problem/MonacoEditor.vue";
/**
 * 题目信息
// 模拟题目信息，实际应用中应由后端提供
 * 
 */
const questionInfo = ref();
const title = ref();
/**
 * 获取题目ID
 */
 const route = useRoute();

function getProblemId() {
  const { id } = route.query;
  return id;
}
const tags = ref(['blue', 'yellow', 'green', 'yellow'])
onMounted(async () => {
  const id = getProblemId();
  const res = await fetchProblemDetail(String(id));
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg });
    return;
  }
  tags.value = res.data.data.tag
  questionInfo.value = res.data.data.question_msg.content;
  title.value = res.data.data.question_msg.title;
});
/**
 * 上传答案
 */
const answer = ref("");
function handleCodeUpdate(newCode) {
  answer.value = newCode;
}
const uploadAnswer = async () => {
  const id = Number(getProblemId());
  console.log(answer.value,"uploadAnswer");
  const res = await fetchUploadAnswer( id, answer.value );
  if (res.data.code != 200) {
    toast.add({ severity: "error", summary: res.data.msg });
    return;
  }
  output.value = res.data.data.result;
};
// 模拟输出信息，实际应用中应由后端提供
const output = ref(`测试用例: 输入xxx\n输出: yyy\n测试结果: 通过`);
</script>
