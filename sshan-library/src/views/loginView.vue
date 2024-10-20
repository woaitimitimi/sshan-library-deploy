<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="row my-3">
        <div class='mb-3'>
          <label for="username" class="form-label">username</label>
          <input type="text" id="username" class="form-control" v-model="username" />
        </div>
        <div class='mb-3'>
          <label for="password" class="form-label">password</label>
          <input type="password" id="password" class="form-control" v-model="password" />
        </div>
      </div>
      <div class="text-center my-3">
        <button type="submit" class="btn btn-primary">Login</button>
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth.js'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = () => {
  const success = login(username.value, password.value)
  if (success) {
    router.push({ name: 'about' })
  } else {
    errorMessage.value = "Invalid username or password"
  }
}

</script>