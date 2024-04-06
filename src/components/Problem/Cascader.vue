<template>
    <a-cascader v-model:value="value" :defaultValue="defaultOption" :options="options" placeholder="Please select" @change="changeItem" />
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['options', 'defaultOption', 'type']);
const emit = defineEmits(['handleThemeItem', 'handleLanguageItem'])
const value = ref();
function changeItem() {
    if (props.type === 'theme') {
        emit('handleThemeItem', value.value[0]);
    } else if (props.type === 'language') {
        emit('handleLanguageItem', value.value[0]);
    }
}
</script>