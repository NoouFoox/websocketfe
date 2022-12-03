<script setup>
import { reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { socket } from "../io";
import { msg } from "../tool";
const userInfo = reactive({
  name: "",
  msg: "默认信息",
});
socket.on("connect", () => {
  userInfo.name = socket.id;
  msg.emsg("成功建立链接", `标识符为: ${socket.id}`);
});
// 接受消息
socket.on("sendmsg", (d) => console.log("⬅️ " + d.name + ":" + d.msg));
// 发送消息
const e = () => {
  console.log("➡️ " + userInfo.name + ":" + userInfo.msg);
  socket.emit("msg", userInfo);
};
</script>

<template>
  <div>
    <el-button type="success" :icon="Plus"> 新建房间 </el-button>
    <el-row :gutter="20" class="el-row-box">
      <el-col :span="6">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="6" class="el-col-class">
        <el-card shadow="always"> Always </el-card>
      </el-col>
    </el-row>
    <br />
    用户名:<el-input type="text" v-model="userInfo.name" />
    <br />
    信息:<el-input type="text" v-model="userInfo.msg" />
    <br />
    <el-button @click="e">Emit</el-button>
  </div>
</template>

<style scoped>
.el-row-box {
  margin-top: 20px;
}
.el-col-class {
  margin-top: 20px;
}
</style>
