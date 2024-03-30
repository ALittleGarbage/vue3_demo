<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opend :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="" />
          <h1>智能家居系统</h1>
        </a>
        <el-menu-item index="/user">
          <el-icon>
            <Menu />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import EventBus from '@/utils/bus'

const isCollapse = ref(false)

EventBus.on('isCollapse', (val) => {
  isCollapse.value = val
})
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  height: 60px;

  img {
    width: 32px;
    height: 32px;
  }
}

.el-aside {
  background-color: #e9e9eb;
  height: 100vh;
  width: auto;
}

.el-menu {
  background-color: #e9e9eb;
  border-right: none;
  width: 200px;

  &.el-menu--collapse {
    width: 60px;

    & h1 {
      display: none;
    }
  }
}
</style>
