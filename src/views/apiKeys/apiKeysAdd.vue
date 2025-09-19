<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>➕ Add API Key</h2>

      <div class="card-form-group">
        <label>Client</label>
        <select v-model="clientId" required>
          <option disabled value="">Select client</option>
          <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
        </select>
      </div>

      <div class="card-form-group">
        <label>Valid From</label>
        <input class="input" type="date" v-model="validFrom" />
      </div>

      <div class="card-form-group">
        <label>Valid To</label>
        <input class="input" type="date" v-model="validTo" />
      </div>

      <div class="card-form-group">
        <label>Status</label>
        <select v-model="status">
          <option value="active">Active</option>
          <option value="revoked">Revoked</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div class="card-form-group">
        <label>
          <input type="checkbox" v-model="ipRestriction" />
          Require IP restriction
        </label>
      </div>

      <div v-if="ipRestriction" class="card-form-group">
        <label>Allowed IPs</label>
        <div v-for="(ip, index) in ips" :key="index" style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
          <input type="text" v-model="ips[index]" placeholder="Enter IP" />
          <button type="button" class="button button--danger button--h-small" @click="removeIp(index)">🗑️</button>
        </div>
        <button type="button" class="button button--primary button--h-small" @click="addIp">➕ Add IP</button>
      </div>

      <div style="display:flex; gap: 12px; justify-content:space-between; margin-top:1.5rem;">
        <button type="button" class="button button--primary" @click="createKey">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/axios.js'
import { handleError, handleSuccess } from '@/utils/toastHandler.js'

const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const clientId = ref('')
const validFrom = ref('')
const validTo = ref('')
const status = ref('active')
const ipRestriction = ref(false)
const ips = ref([''])
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

const addIp = () => ips.value.push('')
const removeIp = (index) => ips.value.splice(index, 1)

const createKey = async () => {
  try {
    const payload = {
      client_id: clientId.value,
      valid_from: validFrom.value || null,
      valid_to: validTo.value || null,
      status: status.value,
      ip_restriction: ipRestriction.value,
      ips: ipRestriction.value ? ips.value.filter(ip => ip.trim()) : [],
    }
    await api.post(`${gatewayUrl}/admin/api_keys`, payload)
    handleSuccess('API Key has been created successfully!')

    // Reset form
    clientId.value = ''
    validFrom.value = ''
    validTo.value = ''
    status.value = 'active'
    ipRestriction.value = false
    ips.value = ['']

    router.push('/admin/apikeys')
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}

onMounted(fetchClients)
</script>