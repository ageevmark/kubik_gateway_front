<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Edit User</h2>
      <div class="card-form-group">
        <label>Username</label>
        <input v-model="form.username" type="text" required />
      </div>

      <div class="card-form-group">
        <label>New Password</label>
        <input v-model="form.password" type="password" />
      </div>

      <div class="card-form-group">
        <label>Confirm Password</label>
        <input v-model="form.confirmPassword" type="password" />
      </div>

      <div class="card-form-group">
        <button class="button button--primary" :disabled="loading" @click="submitForm">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/utils/axios.js'
import { handleError, handleSuccess } from '@/utils/toastHandler.js'

const route = useRoute()
const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const loading = ref(false)

const fetchUser = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/users/${route.params.id}`)
    form.value.username = res.data.username
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}

const submitForm = async () => {
  if (form.value.password && form.value.password !== form.value.confirmPassword) {
    handleError({ message: "Passwords do not match" })
    return
  }

  try {
    loading.value = true
    const payload = { username: form.value.username }
    if (form.value.password) payload.password = form.value.password

    await api.put(`${gatewayUrl}/admin/users/${route.params.id}`, payload)
    handleSuccess('User has been updated successfully')
    router.push('/admin/users')
  } catch (err) {
    console.error(err)
    handleError(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchUser)
</script>