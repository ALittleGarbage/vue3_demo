<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="verifyRule"
      ref="formRef"
      label-width="120px"
      label-position="top"
    >
      <h2>登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { login } from '@/api/users'
import { useTokenStore } from '@/stores/token'
import { useRouter, useRoute } from 'vue-router'

const tokenStore = useTokenStore()
const router = useRouter()
const route = useRoute()

const isLoading = ref(false)
const formRef = ref()
const form = reactive({
  phone: '',
  password: ''
})

// button登录
const handleLogin = async () => {
  // 避免重复登录
  isLoading.value = true
  // 验证表单校验
  await formRef.value?.validate().catch((err) => {
    ElMessage.error('表单校验失败')
    isLoading.value = false
    throw err // 抛出异常，直接返回
  })
  // 获取登录token
  const data = await login(form).then((resp) => {
    if (!resp.data.success) {
      ElMessage.error('账号或者密码错误')
      isLoading.value = false

      return new Error('账号或者密码错误')
    }
    return resp.data
  })
  // 保存token
  tokenStore.setToken(data.content)
  ElMessage.success('登录成功')
  isLoading.value = false
  // 登录成功，跳转到原来页面，不存在则跳转到首页
  router.push(route.query.redirect || '/')
}

// 验证规则
const verifyRule = reactive({
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '手机号必须为11位' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度需要6~18位', trigger: 'blur' }
  ]
})
</script>

<style scoped>
.login {
  background-color: #eee;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 300px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    .el-form-item {
      margin-top: 20px;
    }
    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
