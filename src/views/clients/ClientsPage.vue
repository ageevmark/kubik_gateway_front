<template>
  <div class="homePage-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th class="table-id">ID</th>
          <th>UUID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Contact</th>
          <th>Status</th>
          <th>Is internal</th>
          <th class="table-dates">Created At</th>
          <th class="table-dates">Updated At</th>
          <th class="table-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td class="table-id">{{ client.id }}</td>
          <td>{{ client.uuid }}</td>
          <td>{{ client.name }}</td>
          <td>{{ client.description }}</td>
          <td>{{ client.contact_person }}, {{ client.contact_email }}, {{ client.contact_phone }}</td>
          <td>{{ client.status }}</td>
          <td>{{ client.is_internal }}</td>
          <td class="table-dates">{{ new Date(client.created_at).toLocaleString() }}</td>
          <td class="table-dates">{{ new Date(client.updated_at).toLocaleString() }}</td>
          <td class="table-actions">
            <div style="display: flex; gap: 8px; justify-content: center;">
              <button class="button button--primary button--h-small"
                v-if="client.role !== 'superuser'"
                @click="editClient(client)"
              >
                ✏️
              </button>
              <button class="button button--danger button--h-small"
                v-if="client.role !== 'superuser'"
                @click="deleteClient(client)"
              >
                🗑️
              </button>
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

const clients = ref([])
const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const fetchClients = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/clients`)
    clients.value = res.data
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

const editClient = (client) => {
  router.push(`/admin/clients/edit/${client.id}`)
}

const deleteClient = async (client) => {
  if (!confirm(`Delete client ${client.name}?`)) return
  try {
    await api.delete(`${gatewayUrl}/admin/clients/${client.id}`)
    clients.value = clients.value.filter(c => c.id !== client.id)
    handleSuccess(`Client "${client.name}" has been deleted successfully`)
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

onMounted(fetchClients)
</script>