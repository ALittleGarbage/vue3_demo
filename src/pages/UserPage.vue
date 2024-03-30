<template>
  <el-card style="max-width: auto">
    <template #header>
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="query.phone" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="query.name" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClear">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="userList.records" style="width: 100%">
      <el-table-column prop="id" label="id" align="center" />
      <el-table-column label="头像" align="center">
        <template #default="{ row }">
          <el-avatar :src="row.avatar || defaultAvatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" align="center" />
      <el-table-column prop="phone" label="手机号" align="center" />
      <el-table-column prop="create_time" label="注册时间" :formatter="timeFormat" align="center" />
      <el-table-column label="状态" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            class="mb-2"
            active-value="enable"
            incative-value="disable"
            active-text="启用"
            inactive-text="禁用"
            @change="handleStatusChange($event || 'disable', row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        v-model:current-page="query.page"
        v-model:page-size="query.page_size"
        :page-sizes="[5, 10, 20, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserList } from '@/api/users'
import { timeFormat } from '@/utils/time'

const defaultAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const query = reactive({
  phone: '',
  name: '',
  page: 1,
  page_size: 5,
})
const userList = reactive({
  records: [],
  total: 0
})

const queryUserList = async () => {
  const resp = await getUserList(query)
  if (resp.data.success) {
    userList.records = resp.data.content.records
    userList.total = resp.data.content.total
  } else {
    ElMessage.error('查询失败')
  }
}

const handleQuery = () => {
  query.page = 1
  queryUserList()
}

const handleClear = () => {
  query.phone = ''
  query.name = ''
  query.page = 1
  queryUserList()
}

const handleStatusChange = (e, id) => {
  console.log(e, id)
}

const handleSizeChange = (page_size) => {
  query.page = 1
  query.page_size = page_size
  queryUserList()
}

const handleCurrentChange = (page) => {
  query.page = page
  queryUserList()
}

queryUserList()
</script>

<style scoped>
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
