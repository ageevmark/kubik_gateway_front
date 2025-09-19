<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Edit API Key</h2>

      <div class="card-form-group">
        <label>Client</label>
        <select v-model="form.client_id" required>
          <option value="" disabled>Select client</option>
          <option v-for="c in clients" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>

      <div class="card-form-group">
        <label>Status</label>
        <select v-model="form.status">
          <option value="active">Active</option>
          <option value="revoked">Revoked</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div class="card-form-group">
        <label>Valid From</label>
        <input type="date" v-model="form.valid_from" />
      </div>

      <div class="card-form-group">
        <label>Valid To</label>
        <input type="date" v-model="form.valid_to" />
      </div>

      <div class="card-form-group" style="display: flex; justify-content: flex-start; margin-bottom: 12px;">
        <label>Require IP restriction</label>
        <input type="checkbox" v-model="form.ip_restriction" />
      </div>

      <div v-if="form.ip_restriction" class="card-form-group">
        <label>Allowed IPs</label>
        <div v-for="(ip, index) in form.ips" :key="ip.id || index" class="ip-input" style="display: flex; gap: 12px;">
          <input type="text" v-model="ip.ip_address" placeholder="Enter IP address" />
          <button type="button" class="button button--danger button--h-small" @click="removeIp(index)">🗑️</button>
        </div>
        <button type="button" class="button button--primary button--h-small" @click="addIp">
          ➕ Add IP
        </button>
      </div>

      <div class="card-form-group" style="margin-top: 12px;">
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
const loading = ref(false)

const form = ref({
  client_id: '',
  status: 'active',
  valid_from: '',
  valid_to: '',
  ip_restriction: false,
  ips: []
})
const clients = ref([])

const fetchClients = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/clients`)
    clients.value = res.data
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}

const fetchApiKey = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/api_keys/${route.params.id}`)
    const key = res.data
    form.value.client_id = key.client_id
    form.value.status = key.status
    form.value.valid_from = key.valid_from?.split('T')[0] || ''
    form.value.valid_to = key.valid_to?.split('T')[0] || ''
    form.value.ip_restriction = key.ip_restriction
    form.value.ips = key.ips?.map(ip => ({ ...ip })) || []
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}

const addIp = () => form.value.ips.push({ ip_address: '' })
const removeIp = (index) => form.value.ips.splice(index, 1)

const submitForm = async () => {
  try {
    loading.value = true
    await api.put(`${gatewayUrl}/admin/api_keys/${route.params.id}`, form.value)
    handleSuccess('API Key has been updated successfully')
    router.push('/admin/apikeys')
  } catch (err) {
    console.error(err)
    handleError(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClients()
  fetchApiKey()
})
</script>