<template>
  <div class="homePage-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th class="table-id">ID</th>
          <th>Client</th>
          <th>UUID</th>
          <th>API Key</th>
          <th>Status</th>
          <th>Valid From</th>
          <th>Valid To</th>
          <th>IP Restriction</th>
          <th class="table-dates">Created At</th>
          <th class="table-dates">Updated At</th>
          <th class="table-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in apiKeys" :key="key.id">
          <td class="table-id">{{ key.id }}</td>
          <td>{{ key.client?.name || '-' }}</td>
          <td>{{ key.client?.uuid || '-' }}</td>
          <td>{{ key.api_key }}</td>
          <td>{{ key.status }}</td>
          <td>{{ key.valid_from ? new Date(key.valid_from).toLocaleDateString() : '-' }}</td>
          <td>{{ key.valid_to ? new Date(key.valid_to).toLocaleDateString() : '-' }}</td>
          <td>{{ key.ip_restriction ? '✅' : '❌' }}</td>
          <td class="table-dates">{{ new Date(key.created_at).toLocaleString() }}</td>
          <td class="table-dates">{{ new Date(key.updated_at).toLocaleString() }}</td>
          <td class="table-actions">
            <div style="display: flex; gap: 8px; justify-content: center;">
              <button class="button button--primary button--h-small" @click="editKey(key)">✏️</button>
              <button class="button button--danger button--h-small" @click="deleteKey(key)">🗑️</button>
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

const apiKeys = ref([])
const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const fetchApiKeys = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/api_keys`)
    apiKeys.value = res.data
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

const editKey = (key) => {
  router.push(`/admin/apikeys/edit/${key.id}`)
}

const deleteKey = async (key) => {
  if (!confirm(`Delete API key ID=${key.id}?`)) return
  try {
    await api.delete(`${gatewayUrl}/admin/api_keys/${key.id}`)
    apiKeys.value = apiKeys.value.filter(k => k.id !== key.id)
    handleSuccess(`API key "${key.id}" has been deleted successfully`)
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

onMounted(fetchApiKeys)
</script>