<template>
  <div class="homePage-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th class="table-id">ID</th>
          <th>Username</th>
          <th>Role</th>
          <th class="table-dates">Created At</th>
          <th class="table-dates">Updated At</th>
          <th class="table-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="table-id">{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td class="table-dates">{{ new Date(user.created_at).toLocaleString() }}</td>
          <td class="table-dates">{{ new Date(user.updated_at).toLocaleString() }}</td>
          <td class="table-actions">
            <div style="display: flex; gap: 8px; justify-content: center;">
              <button class="button button--primary button--h-small" v-if="user.role !== 'superuser'" @click="editUser(user)">✏️</button>
              <button class="button button--danger button--h-small" v-if="user.role !== 'superuser'" @click="deleteUser(user)">🗑️</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/axios.js'
import { handleError, handleSuccess } from '@/utils/toastHandler.js'

const users = ref([])
const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const fetchUsers = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/users`)
    users.value = res.data
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

const editUser = (user) => {
  router.push(`/admin/users/edit/${user.id}`)
}

const deleteUser = async (user) => {
  if (!confirm(`Delete user ${user.username}?`)) return
  try {
    await api.delete(`${gatewayUrl}/admin/users/${user.id}`)
    users.value = users.value.filter(u => u.id !== user.id)
    handleSuccess(`User "${user.username}" has been deleted successfully`)
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

onMounted(fetchUsers)
</script>