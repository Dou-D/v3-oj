<template>
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
                        <Cascader :defaultOption="'vs'" :options="optionsTheme" @handleThemeItem="handleThemeItem" />
                    </a-col>
                    <a-col :span="8" :offset="8">
                        <Cascader :options="optionsLanguage" :defaultOption="'C'" @handleLanguageItem="handleLanguageItem" />
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
import { ref } from 'vue';

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

function handleLanguageItem(val) {
    language.value = val
}
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
function handleThemeItem(val) {
    theme.value = val
}

import MonacoEditor from '@/components/Problem/MonacoEditor.vue'
// 模拟题目信息，实际应用中应由后端提供
const questionInfo = ref(`<p>这里是题目描述...</p><p>请编写代码完成任务...</p>`);

// 用户在代码编辑器中输入的代码
const code = ref('');

// 模拟输出信息，实际应用中应由后端提供
const output = ref(`测试用例: 输入xxx\n输出: yyy\n测试结果: 通过`);
</script>