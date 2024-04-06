<template>
    <vue-monaco-editor style="height: 50vh;" :theme="props['theme']" original="// the original code" modified="// the modified code"
        :language="props.language" :options="OPTIONS" @mount="handleMount"/>
</template>


<script setup>
import { ref } from 'vue'
const props = defineProps(['theme', 'language'])

const OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    readOnly: false,
}

const diffEditorRef = ref(null)

const handleMount = (diffEditor) => {
    diffEditorRef.value = diffEditor
}
console.log("props.theme, props.language",props.theme, props.language);

</script>