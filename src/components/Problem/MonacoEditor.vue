<template>
  <vue-monaco-editor
    style="height: 50vh"
    :theme="props['theme']"
    original="// the original code"
    modified="// the modified code"
    :language="props.language"
    :options="OPTIONS"
    v-model:value="code"
    @change="handleInput"
  />
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["theme", "language"]);
const emit = defineEmits(["codeUpdate"]);

const OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  readOnly: false,
};


const code = ref()
function handleInput() {
  emit("codeUpdate", code.value);
}
</script>
