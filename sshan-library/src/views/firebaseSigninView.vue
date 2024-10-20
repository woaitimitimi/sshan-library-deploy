<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <button @click="signin">sign in via Firebase</button>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

const signin = async () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Firebase Sign in Successful!')
      router.push('/')
      console.log(auth.currentUser)
    }).catch((error) => {
      console.log(error.code)
    })
}
</script>