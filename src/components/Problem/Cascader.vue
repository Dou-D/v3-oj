<template>
    <a-cascader v-model:value="value" :defaultValue="defaultOption" :options="options" placeholder="Please select" @change="changeItem" />
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['options', 'defaultOption', 'language']);
const emit = defineEmits(['handleThemeItem'])
const value = ref();

function changeItem() {
    emit('handleThemeItem', value.value[0])
}
</script>