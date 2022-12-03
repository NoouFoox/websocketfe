<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { socket } from "../io";
import { msg } from "../tool";
const userInfo = reactive({
  name: "",
  msg: "默认信息",
});
const roomId = ref(1001);
let roomList = reactive([]);
socket.on("connect", () => {
  userInfo.name = socket.id;
  msg.emsg("成功建立链接", `标识符为: ${socket.id}`);
});

socket.emit("uproomliet")
socket.on("sendmsg", (d) => console.log("⬅️ " + d.name + ":" + d.msg));
socket.on("getroom", (d) => {
  const result = [];
  Object.keys(d).forEach((i) => {
    result.push({ rid: i, list: d[i].length });
  });
  roomList.length = 0;
  roomList.push(...result);
});
const ef = () => {
  console.log("➡️ " + userInfo.name + ":" + userInfo.msg);
  socket.emit("msg", userInfo);
  elinput.value.clear();
};

// 房间注册
const getRoom = () => {
  socket.emit("getRoomList", roomId.value);
};
const elinput = ref();
const inputbox = ref();

onMounted(() => {
  inputbox.value.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      ef();
    }
  });
});
</script>

<template>
  <div>
    <el-input type="number" v-model="roomId"></el-input>
    <el-button type="success" :icon="Plus" @click="getRoom">
      新建房间/加入房间
    </el-button>
    <el-row :gutter="20" class="el-row-box">
      <el-col :span="6" v-for="c in roomList" :key="c.rid" class="el-col-class ">
        <el-card shadow="always" :header="'房间号:'+c.rid" >
          <p>在线人数: {{ c.list }}</p>
        </el-card>
      </el-col>
    </el-row>
    用户名:<el-input type="text" v-model="userInfo.name" /> 信息:
    <div ref="inputbox">
      <el-input type="text" v-model="userInfo.msg" ref="elinput" />
    </div>
    <el-button @click="ef">发送</el-button>
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
