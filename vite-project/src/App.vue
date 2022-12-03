<script setup>
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";
const isDark = useDark();
const flagDark = () => isDark;
</script>
<template>
  <el-container class="container">
    <el-header class="container-header">
      <el-menu :router="true" mode="horizontal">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/about">About</el-menu-item>
        <el-menu-item :index="`/user/${'游客登录'}`">User</el-menu-item>
        <el-menu-item index="/chat">Chat</el-menu-item>
        <el-switch
        @change="flagDark"
        v-model="isDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        class="container-header-switch"
      />
      </el-menu>
    </el-header>
    <el-main>
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
</style>
