<script setup>
import { userStore } from "../pinia";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { router } from "../router";
const store = userStore();
const { count } = storeToRefs(store);
onMounted(() => {
  // @ts-ignore
  localStorage.setItem("nickName", decodeURI(router.currentRoute.value.path));
  // console.log(decode(router.currentRoute.value.path));
});
</script>

<template>
  <div>
    <h1>用户页面</h1>
    <p>用户{{ $route.params.id }}</p>
    <mark>{{ count }}</mark>
    <br />
    <button @click="count++">按钮</button>
  </div>
</template>

<style scoped></style>
