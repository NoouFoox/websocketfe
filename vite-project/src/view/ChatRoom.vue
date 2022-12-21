<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import dayjs from "dayjs";
import { socket } from "../io";
import { msg } from "../tool";
import { ElMessage } from "element-plus";
import push from "push.js";
const msgon = ref();
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
const msgList = reactive([]);
socket.emit("uproomliet");
socket.on("sendmsg", (d) => {
  msgList.push({ name: d.name, msg: d.msg });
  // console.log("⬅️ " + d.name + ":" + d.msg);
  if (localStorage.getItem("##@@mit") === "true") {
    push.create(d.name, {
      body: d.msg,
      timeout: 1500,
    });
  }
  setTimeout(() => {
    msgon.value.scrollTo(0, msgon.value.scrollHeight);
  }, 1);
});
socket.on("getroom", (d) => {
  const result = [];
  Object.keys(d).forEach((i) => {
    result.push({ rid: i, list: d[i].length });
  });
  roomList.length = 0;
  roomList.push(...result);
});
const ef = () => {
  if (userInfo.name === "") {
    ElMessage({
      message: "请输入用户名",
      type: "warning",
    });
    return;
  }
  if (userInfo.msg === "") {
    ElMessage({
      message: "请输入要发送的信息",
      type: "warning",
    });
    return;
  }
  // console.log("➡️ " + userInfo.name + ":" + userInfo.msg);
  msgList.push({
    name: "(你)" + userInfo.name,
    msg: userInfo.msg,
    color: true,
  });
  socket.emit("msg", userInfo);
  elinput.value.clear();
  setTimeout(() => {
    console.log(msgon.value.scrollHeight);
    msgon.value.scrollTo(0, msgon.value.scrollHeight);
  }, 1);
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
  <div class="main">
    <!-- <el-input type="number" v-model="roomId"></el-input>
    <el-button type="success" :icon="Plus" @click="getRoom">
      新建房间/加入房间
    </el-button>
    <el-row :gutter="20" class="el-row-box">
      <el-col :span="6" v-for="c in roomList" :key="c.rid" class="el-col-class ">
        <el-card shadow="always" :header="'房间号:'+c.rid" >
          <p>在线人数: {{ c.list }}</p>
        </el-card>
      </el-col>
    </el-row> -->

    <div>
      用户名:<el-input type="text" v-model="userInfo.name" /> 信息:
      <div ref="inputbox">
        <el-input type="text" v-model="userInfo.msg" ref="elinput" />
      </div>
    </div>

    <div class="msgon" ref="msgon">
      <el-timeline>
        <el-timeline-item
          :timestamp="dayjs().format()"
          v-for="(activity, index) in msgList"
          :key="index"
          ><span
            :style="{ color: activity.color === true ? '#aa3322' : '#66771a' }"
            >{{ activity.name }}</span
          >: &nbsp;{{ activity.msg }}</el-timeline-item
        >
      </el-timeline>
    </div>
    <el-button class="btn" @click="ef">发送</el-button>
  </div>
</template>

<style scoped>
.el-row-box {
  margin-top: 20px;
}
.el-col-class {
  margin-top: 20px;
}
.main {
  height: 100%;
}
.msgon {
  overflow: auto;
  margin-top: 40px;
  height: 60vh;
}
.btn {
  position: fixed;
  bottom: 20px;
  width: 60vw;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000000;
}
</style>
