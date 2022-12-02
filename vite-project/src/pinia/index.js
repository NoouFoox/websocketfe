import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("main", () => {
  const count = ref(0);
  const conuntsub1 = () => count.value++;
  return { count, conuntsub1 };
});
