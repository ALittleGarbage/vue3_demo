<template>
  <el-header>
    <!-- 图标 -->
    <el-icon @click="handleCollapse">
      <Expand v-show="isCollapse" />
      <Fold v-show="!isCollapse" />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :src="userInfo.avatar" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.name }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup>
import { reactive, ref } from 'vue'
import EventBus from '@/utils/bus'
import { getUserInfo, logout } from '@/api/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'

// 不能在回调中使用
const router = useRouter()

const defaultAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const isCollapse = ref(false)
const userInfo = reactive({
  name: '用户名',
  avatar: defaultAvatar.value
})

getUserInfo().then((resp) => {
  if (resp.data.success) {
    userInfo.name = resp.data.content.name
    userInfo.avatar = resp.data.content.avatar
  }
})

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
  EventBus.emit('isCollapse', isCollapse.value)
}

const handleLogout = async () => {
  // 提示框
  await ElMessageBox.confirm('确认要退出吗？', '退出操作', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    // 取消操作
    return new Promise(() => {})
  })
  // 退出请求
  await logout().catch(() => {})
  // 清除token
  const tokenStore = useTokenStore()
  tokenStore.clearToken()
  // 跳转到登录页面
  router.push({ name: 'Login' })
  ElMessage.success('退出成功')
}
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #dedfe0;

  .el-icon {
    margin-right: 16px;
  }

  .el-dropdown {
    margin-left: auto;

    .el-dropdown-link {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
