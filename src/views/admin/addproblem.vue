<template>
    <Toast />
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
                    <a-radio-button v-for="item in 5" :value="item+1">{{ item }}</a-radio-button>
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
                <a-tag v-for="(tag, index) in IOtag" :key="index" closable @close="removeTag(index)">
                    {{ tag }}
                </a-tag>
            </div>
            <a-button @click="showIODialog = true">输入输出</a-button>
            <!-- 输入输出 -->
            <Dialog v-model:visible="showIODialog" modal header="新增输入输出" :style="{ width: '30rem' }">
                <div class="p-fluid">
                    <div class="p-field">
                        <label for="tag-name">输入</label>
                        <a-textarea v-model:value="input" placeholder="输入" auto-size />
                    </div>
                    <div class="p-field">
                        <label for="tag-name">输出</label>
                        <a-input v-model:value="output" placeholder="输出" />
                    </div>
                </div>
                <div class="dialog-footer">
                    <a-button @click="showIODialog = false">取消</a-button>
                    <a-button type="primary" @click="addIOTag">确认</a-button>
                </div>
            </Dialog>
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
const difficulty = ref();

// io tag --输入输出
const IOtag = ref([])
const showIODialog = ref(false)
const input = ref('')
const output = ref('')
const addIOTag = () => {
    if(input.value.trim() && output.value.trim()){
        IOtag.value.push({
            input: input.value,
            output: output.value
        })
        input.value = ''
        output.value = ''
        showIODialog.value = false
    }
    console.log(IOtag.value, "IODialog");
}

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


const submitQuestion = async () => {
    if (!title.value && !content.value && !difficulty.value && !IOtag.value && !tags.value) {
        console.log("title:", title.value);
        console.log("content:", content.value);
        console.log("difficulty:", difficulty.value);
        console.log("IOtag:", IOtag.value);
        console.log("tags:", tags.value);
    }
    const res = await fetchUploadQuestion({
        title: title.value,
        content: content.value,
        tag: tags.value,
        degree: Number(difficulty.value),
        io: IOtag.value,
    });
    if(res.data.code != 200) {
        toast.add({ severity: 'error', summary: res.data.msg,life: 3000 });
        return
    }
    toast.add({ severity:'success', summary: res.data.msg, life: 3000 });
};
</script>

<style scoped>
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