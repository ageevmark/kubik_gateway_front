<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Add New Admin</h2>
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button class="button button--primary" @click="createUser">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/utils/axios.js'
import { useRouter } from 'vue-router'
import { handleError, handleSuccess } from '@/utils/toastHandler.js'

const username = ref('')
const password = ref('')
const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const createUser = async () => {
  try {
    const res = await api.post(`${gatewayUrl}/admin/users`, {
      username: username.value,
      password: password.value
    })

    handleSuccess(`User "${res.data.username}" has been created successfully!`)

    // Clear form
    username.value = ''
    password.value = ''

    // Redirect to users list
    router.push('/admin/users')
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}
</script>