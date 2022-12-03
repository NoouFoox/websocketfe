<script setup>
import { onUnmounted } from "vue";
onUnmounted(() => {
  console.log("组件被关闭");
});
</script>

<template>
  <h1>初始页面</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
