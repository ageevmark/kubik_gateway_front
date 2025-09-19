<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Admin Login</h2>
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button class="button button--primary" @click="login">Sign in</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/axios.js'
import { handleError, handleSuccess } from '@/utils/toastHandler.js'

const router = useRouter()
const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await api.post('/admin/login', {
      username: username.value,
      password: password.value
    })

    const data = res.data
    if (data.token && data.user) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      handleSuccess('You have logged in successfully')
      router.push('/admin')
    } 
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}
</script>