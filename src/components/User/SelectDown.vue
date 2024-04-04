<template>
    <h2>use a-select-option</h2>
    <a-space>
        <a-select ref="select" v-model:value="value1" style="width: 120px" @focus="focus" @change="handleChange">
            <a-select-option v-for="item in options1" :key="item.value" :value="item.value">
                {{ item.label }}
            </a-select-option>
        </a-select>
    </a-space>

</template>
<script setup>
import { ref } from 'vue';
const value1 = ref('lucy');

const props = defineProps({
    options: {
        type: Array,
        default: () => [],
    },
})

const options1 = ref([
    {
        value: 'jack',
        label: 'Jack',
    },
    {
        value: 'lucy',
        label: 'Lucy',
    },
    {
        value: 'yiminghe',
        label: 'Yiminghe',
    },
]);
const focus = () => {
    console.log('focus');
};
const handleChange = value => {
    console.log(`selected ${value}`);
};
</script>