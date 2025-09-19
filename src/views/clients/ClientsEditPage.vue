<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Edit Client</h2>
      <div class="card-form-group">
        <label>Name</label>
        <input v-model="form.name" type="text" required />
      </div>

      <div class="card-form-group">
        <label>Description</label>
        <textarea v-model="form.description"></textarea>
      </div>

      <div class="card-form-group">
        <label>Contact Person</label>
        <input v-model="form.contact_person" type="text" />
      </div>

      <div class="card-form-group">
        <label>Contact Email</label>
        <input v-model="form.contact_email" type="email" />
      </div>

      <div class="card-form-group">
        <label>Contact Phone</label>
        <input v-model="form.contact_phone" type="text" />
      </div>

      <div class="card-form-group">
        <label>Status</label>
        <select v-model="form.status">
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div class="card-form-group">
        <label>Type</label>
        <select v-model="form.is_internal">
          <option :value="false">External Client</option>
          <option :value="true">Internal Microservice</option>
        </select>
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
const loading = ref(false)

const form = ref({
  name: '',
  description: '',
  contact_person: '',
  contact_email: '',
  contact_phone: '',
  status: 'active'
})

const fetchClient = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/clients/${route.params.id}`)
    Object.assign(form.value, res.data)
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}

const submitForm = async () => {
  try {
    loading.value = true
    await api.put(`${gatewayUrl}/admin/clients/${route.params.id}`, form.value)
    handleSuccess('Client has been updated successfully')
    router.push('/admin/clients')
  } catch (err) {
    console.error(err)
    handleError(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchClient)
</script>