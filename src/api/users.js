// import request from "@/utils/request";

export const login = (loginInfo) => {
  // return request({
  //     method: 'POST',
  //     url: '/api/login',
  //     data: `phone=${loginInfo.phone}&password=${loginInfo.password}`
  // })
  console.log('user.js', 'login', loginInfo)
  return new Promise((resolve) => {
    resolve({
      data: {
        success: true,
        content: JSON.stringify({ access_token: '1123456', refresh_token: '123456' })
      }
    })
  })
}

export const getUserInfo = () => {
  console.log('user.js', 'getUserInfo')
  return new Promise((resolve) => {
    resolve({
      data: {
        success: true,
        content: {
          name: '大黄',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }
      }
    })
  })
}

export const logout = () => {
  console.log('user.js', 'logout')
  return new Promise((resolve) => {
    resolve({
      data: {
        success: true,
        content: JSON.stringify({ access_token: '123456', refresh_token: '123456' })
      }
    })
  })
}

export const refreshToken = (reToken) => {
  console.log('user.js', 'refreshToken', reToken)
  return new Promise((resolve) => {
    resolve({
      data: { success: true, content: {} }
    })
  })
}

export const getUserList = (query) => {
  console.log('user.js', 'getUserList', query)
  const userList = []
  for (
    let index = (query.page - 1) * query.page_size;
    index < (query.page - 1) * query.page_size + query.page_size;
    index++
  ) {
    userList.push({
      id: index,
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: `大黄${index}`,
      phone: `132456789${index}`,
      create_time: '2024-09-03T20:18:40.000+0800',
      status: 'enable'
    })
  }

  return new Promise((resolve) => {
    resolve({
      data: {
        success: true,
        content: {
          records: userList,
          total: 400
        }
      }
    })
  })
}
