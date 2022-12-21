<script setup>
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";
import { ref } from "vue";
const isDark = useDark();
const flagDark = () => isDark;
const locemit = ref(false);
const locclick = () => {
  localStorage.setItem("##@@mit", JSON.stringify(locemit.value));
};
locclick();
if (localStorage.getItem("##@@mit") !== null) {
  if (localStorage.getItem("##@@mit") === "false") {
    locemit.value = false;
  } else {
    locemit.value = true;
  }
}
</script>
<template>
  <el-container class="container">
    <el-header class="container-header">
      <el-menu :router="true" mode="horizontal">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/about">About</el-menu-item>
        <el-menu-item :index="`/user/${'游客登录'}`">User</el-menu-item>
        <el-menu-item index="/chat">Chat</el-menu-item>
        <div class="container-header-switch">
          通知:
          <el-switch
            @change="locclick"
            v-model="locemit"
            active-text="开启"
            inactive-text="关闭"
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <el-switch
            @change="flagDark"
            v-model="isDark"
            :active-icon="Moon"
            :inactive-icon="Sunny"
          />
        </div>
      </el-menu>
    </el-header>
    <el-main class="elmmm">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.container > .container-header {
  position: relative;
}
.container > .container-header .container-header-switch {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
.elmmm {
  width: 100%;
}
</style>
