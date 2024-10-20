import { ref } from 'vue'

const isAuthenticated = ref(false)

const login = (username, password) => {
  const hardcodedUsername = 'admin'
  const hardcodedPassword = 'password123'

  if (username === hardcodedUsername && password === hardcodedPassword) {
    isAuthenticated.value = true
    return true
  } else {
    isAuthenticated.value = false
    return false
  }
}

const logout = () => {
  isAuthenticated.value = false
}

export { isAuthenticated, login, logout }
