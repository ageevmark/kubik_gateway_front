<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Edit Microservice</h2>

      <div class="card-form-group">
        <label>Name</label>
        <input v-model="form.name" type="text" required />
      </div>

      <div class="card-form-group">
        <label>Description</label>
        <textarea v-model="form.description"></textarea>
      </div>

      <div class="card-form-group">
        <label>Prefix</label>
        <input v-model="form.prefix" type="text" required />
      </div>

      <div class="card-form-group">
        <label>Prod URL</label>
        <input v-model="form.prod_url" type="text" required />
      </div>

      <div class="card-form-group">
        <label>Dev URL</label>
        <input v-model="form.dev_url" type="text" required />
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
  name: '',
  description: '',
  prefix: '',
  dev_url: '',
  prod_url: '',
})
const loading = ref(false)

const fetchMicroservice = async () => {
  try {
    const res = await api.get(`${gatewayUrl}/admin/microservices/${route.params.id}`)
    form.value.name = res.data.name
    form.value.description = res.data.description
    form.value.prefix = res.data.prefix
    form.value.dev_url = res.data.dev_url
    form.value.prod_url = res.data.prod_url
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}

const submitForm = async () => {
  try {
    loading.value = true
    await api.put(`${gatewayUrl}/admin/microservices/${route.params.id}`, form.value)
    handleSuccess('Microservice has been updated successfully')
    router.push('/admin/microservices')
  } catch (err) {
    console.error(err)
    handleError(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchMicroservice)
</script>