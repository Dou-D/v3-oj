<template>
    <Toast />
    <a-spin :spinning="spinning" />

    <a-row gutter={16}>
        <a-col :span="12">
            <a-card title="题目信息">
                <!-- 假设题目信息是HTML格式，使用v-html渲染 -->
                <div v-html="questionInfo"></div>
            </a-card>
        </a-col>
        <a-col :span="12">
            <a-card title="Monaco Editor" style="height: 100vh;">
                <a-row>
                    <a-col :span="8">
                        <Cascader :options="optionsTheme" :defaultOption="'vs'" type="theme"
                            @handleThemeItem="handleThemeItem" />
                    </a-col>
                    <a-col :span="8">
                        <Button label="提交" severity="success" @click="uploadAnswer" />
                    </a-col>
                    <a-col :span="8">
                        <Cascader :options="optionsLanguage" :defaultOption="'C'" type="language"
                            @handleLanguageItem="handleLanguageItem" />
                    </a-col>
                </a-row>
                <a-divider />
                <MonacoEditor :theme="theme" :language="language" />
            </a-card>
            <a-card title="输出信息">
                <!-- 输出信息和测试结果 -->
                <pre>{{ output }}</pre>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup>
import Cascader from "@/components/Problem/Cascader.vue"
import { fetchProblemDetail, fetchUploadAnswer } from '@/services/problem'
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'primevue/usetoast';
const toast = useToast();

/**
 * 选项配置
 */
const optionsLanguage = ref([
    {
        value: 'C',
        label: 'C'
    },
    {
        value: 'cpp',
        label: 'C++'
    },
    {
        value: 'java',
        label: 'Java'
    },
    {
        value: 'javascript',
        label: 'JavaScript'
    }
])
const language = ref([{
    value: 'C',
    label: 'C'
}])
const optionsTheme = ref([{
    value: 'vs',
    label: 'Visual Studio'
},
{
    value: 'vs-dark',
    label: 'Visual Studio Dark'
},
{
    value: 'hc-black',
    label: 'High Contrast Black'
}])
const theme = ref([
    {
        value: 'vs',
        label: 'Visual Studio'
    }
])
function handleLanguageItem(val) {
    language.value = val; // 假设val是选择的语言代码，如'javascript'
}
function handleThemeItem(val) {
    theme.value = val; // 假设val是选择的主题代码，如'vs-dark'
}
import MonacoEditor from '@/components/Problem/MonacoEditor.vue'
/**
 * 题目信息
// 模拟题目信息，实际应用中应由后端提供
 * 
 */
const questionInfo = ref(`<p>这里是题目描述...</p><p>请编写代码完成任务...</p>`);
/**
 * 获取题目ID
 */
function getProblemId() {
    const router = useRouter();
    const { id } = router.currentRoute.value.params;
    return id;
}
onMounted(async () => {
    const id = getProblemId();
    const spinning = ref(true);
    const res = await fetchProblemDetail(String(id));
    spinning.value = false;
    if (res.data.code != 200) {
        toast.add({ severity: 'error', summary: res.data.msg });
        return
    }
    questionInfo.value = res.data.data.problem.description;
})
/**
 * 上传答案
 */
const code = ref('');
const uploadAnswer = async () => {
    const id = Number(getProblemId());
    const spinning = ref(true);
    const res = await fetchUploadAnswer({ id, answer: code.value });
    spinning.value = false;
    if (res.data.code != 200) {
        toast.add({ severity: 'error', summary: res.data.msg });
        return
    }
    output.value = res.data.data.result;
}
// 模拟输出信息，实际应用中应由后端提供
const output = ref(`测试用例: 输入xxx\n输出: yyy\n测试结果: 通过`);
</script>