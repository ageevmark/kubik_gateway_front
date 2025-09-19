<template>
  <div class="homePage-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th class="table-id">ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Prefix</th>
          <th>Prod URL</th>
          <th>Dev URL</th>
          <th class="table-dates">Created At</th>
          <th class="table-dates">Updated At</th>
          <th class="table-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.id">
          <td class="table-id">{{ service.id }}</td>
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.prefix }}</td>
          <td>{{ service.prod_url }}</td>
          <td>{{ service.dev_url }}</td>
          <td class="table-dates">{{ new Date(service.created_at).toLocaleString() }}</td>
          <td class="table-dates">{{ new Date(service.updated_at).toLocaleString() }}</td>
          <td class="table-actions">
            <div style="display: flex; gap: 8px; justify-content: center;">
              <button class="button button--primary button--h-small" @click="editService(service)">✏️</button>
              <button class="button button--danger button--h-small" @click="deleteService(service)">🗑️</button>
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

const services = ref([])
const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const fetchServices = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/microservices`)
    services.value = res.data
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

const editService = (service) => {
  router.push(`/admin/microservices/edit/${service.id}`)
}

const deleteService = async (service) => {
  if (!confirm(`Delete microservice ${service.name}?`)) return
  try {
    await api.delete(`${gatewayUrl}/admin/microservices/${service.id}`)
    services.value = services.value.filter(s => s.id !== service.id)
    handleSuccess(`Microservice "${service.name}" has been deleted successfully`)
  } catch (err) {
    handleError(err)
    console.error(err)
  }
}

onMounted(fetchServices)
</script>