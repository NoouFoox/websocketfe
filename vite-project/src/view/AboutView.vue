<script setup>
import { userStore } from "../pinia";
import { storeToRefs } from "pinia";

const store = userStore();
const { count } = storeToRefs(store);
const { conuntsub1 } = store;
</script>

<template>
  <div>
    <h1>这是about视图</h1>
    <p>{{ count }}</p>

    <button @click="conuntsub1">++</button>
  </div>
</template>

<style scoped></style>
