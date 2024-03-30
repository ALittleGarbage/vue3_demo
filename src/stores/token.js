import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  const getToken = computed(() =>
    JSON.parse(token.value || window.localStorage.getItem('token') || '{}')
  )
  function setToken(tokenInfo) {
    token.value = tokenInfo
    window.localStorage.setItem('token', tokenInfo)
  }
  function clearToken() {
    token.value = ''
    window.localStorage.setItem('token', '')
  }

  return { getToken, setToken, clearToken }
})
