<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <p>{{ item.username }}</p>
            <p>{{ item.post }}</p>
            <p>{{ item.title }}</p>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
const data = [
  {
    username: "胡松涛",
    post: "前端",
    title: "Vue3+Composition API+antdesign-vue+Vue-Router+Pinia+localstorage+mitt+monaco-editor+axios",
  },
  {
    username: "胡松涛",
    post: "前端",
    title: "Vue3+Composition API+antdesign-vue+Vue-Router+Pinia+localstorage+mitt+monaco-editor+axios",
  },
  {
    username: "胡松涛",
    post: "前端",
    title: "Vue3+Composition API+antdesign-vue+Vue-Router+Pinia+localstorage+mitt+monaco-editor+axios",
  },
];
</script>
