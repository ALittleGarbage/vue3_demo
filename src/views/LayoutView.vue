<template>
  <div class="common-layout">
    <el-container>
      <AsideView />
      <el-container>
        <HeaderView />
        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AsideView from '@/views/AsideView.vue'
import HeaderView from '@/views/HeaderView.vue'
</script>

<style scoped>
.el-container {
  .el-container {
    flex-direction: column;
    height: 100vh;
  }
}
.el-main {
  background-color: #f4f4f5;
  padding-right: 0;
}
</style>
