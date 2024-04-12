<template>
    <Toast />
    <a-spin :spinning="spinning" />
    <div class="upload-container">
        <a-space direction="vertical" size="large">
            <div>
                <a-input v-model:value="title" placeholder="请输入题目标题" />
            </div>

            <div>
                <Editor v-model="content" editorStyle="height: 320px" />
            </div>

            <div>
                <span>题目难度：</span>
                <a-radio-group v-model:value="difficulty">
                    <a-radio-button v-for="item in 5" value="item+1">{{ item }}</a-radio-button>
                </a-radio-group>
            </div>
            <!-- 题目tag -->
            <div>
                <a-tag v-for="(tag, index) in tags" :key="index" closable @close="removeTag(index)">
                    {{ tag }}
                </a-tag>
            </div>

            <!-- 新增标签按钮 -->
            <a-button @click="showDialog = true">新增标签</a-button>
            <div>
                <label>测试用例</label>
                <a-input v-model:value="testInput" placeholder="测试用例" />
            </div>
            <div>
                <label>期望输出</label>
                <a-input v-model:value="expectedOutput" placeholder="期望输出" />
            </div>
            <!-- 输入标签名称的弹窗 -->
            <Dialog v-model:visible="showDialog" modal header="新增标签" :style="{ width: '30rem' }">
                <div class="p-fluid">
                    <div class="p-field">
                        <label for="tag-name">标签名称</label>
                        <a-input v-model:value="newTagName" placeholder="Basic usage" />
                        <!-- <InputText id="tag-name"  autocomplete="off" /> -->
                    </div>
                </div>
                <div class="dialog-footer">
                    <a-button @click="showDialog = false">取消</a-button>
                    <a-button type="primary" @click="addTag">确认</a-button>
                </div>
            </Dialog>
            <a-button type="primary" @click="submitQuestion">提交题目</a-button>
        </a-space>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { fetchUploadQuestion } from '@/services/problem'
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const title = ref('');
const content = ref('');
const difficulty = ref('easy');
const testInput = ref('');
const expectedOutput = ref('');
// const submitQuestion = () => {
//     console.log('Title:', title.value);
//     console.log('Content:', content.value);
//     console.log('Difficulty:', Number(difficulty.value));
//     console.log('Tags:', tags.value[0]);
//     // 实际应用中，在这里可以处理数据提交到后端的逻辑
// };
const submitQuestion = async () => {
    if (!title.value.trim() || !content.value.trim() || !difficulty.value || !testInput.value.trim() || !expectedOutput.value.trim()) {
        alert('确保输入全部内容');
        return;
    }
    const spinning = ref(true);
    const res = await fetchUploadQuestion({
        title: title.value,
        content: content.value,
        tag: tags.value,
        degree: Number(difficulty.value),
        input_test: testInput.value,
        expected_output: expectedOutput.value
    });
    spinning.value = false;
    if(res.data.code != 200) {
        toast.add({ severity: 'error', summary: res.data.msg });
        return
    }
    toast.add({ severity:'success', summary: res.data.msg });
};

// 题目tag逻辑
const tags = ref([]);
const showDialog = ref(false);
const newTagName = ref('');

const addTag = () => {
    if (newTagName.value.trim()) {
        tags.value.push(newTagName.value.trim());
        newTagName.value = ''; // 清空输入框
        showDialog.value = false; // 关闭对话框
    }
};

const removeTag = (index) => {
    tags.value.splice(index, 1);
};
</script>

<style>
.upload-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 根据需要添加更多样式 */
.dialog-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}
</style>