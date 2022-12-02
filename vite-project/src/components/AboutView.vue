<script setup>
import { userStore } from "../pinia";
import { storeToRefs } from "pinia";
import { socket } from "../io";
import { reactive } from "vue";
const userInfo = reactive({
  name: "",
  msg: "默认信息",
});
socket.on("connect", () => {
  console.log(`ID为${socket.id},成功建立链接`);
  userInfo.name = socket.id;
});
// 接受消息
socket.on("sendmsg", (d) => console.log("⬅️ " + d.name + ":" + d.msg));
// 发送消息
const e = () => {
  console.log("➡️ " + userInfo.name + ":" + userInfo.msg);
  socket.emit("msg", userInfo);
};
const store = userStore();
const { count } = storeToRefs(store);
const { conuntsub1 } = store;
</script>

<template>
  <div>
    <h1>这是about视图</h1>
    <p>{{ count }}</p>

    <button @click="conuntsub1">++</button>
    <br />
    用户名:<input type="text" v-model="userInfo.name" />
    <br />
    信息:<input type="text" v-model="userInfo.msg" />
    <br />
    <button @click="e">Emit</button>
  </div>
</template>

<style scoped></style>
