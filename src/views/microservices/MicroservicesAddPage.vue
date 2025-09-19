<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Add New Microservice</h2>
        <input v-model="name" type="text" placeholder="Service Name" required />
        <textarea v-model="description" placeholder="Description"></textarea>
        <input v-model="prefix" type="text" placeholder="Request URL Prefix" required />
        <input v-model="prod_url" type="text" placeholder="Prod URL" required />
        <input v-model="dev_url" type="text" placeholder="Dev URL" required />
      <button class="button button--primary" @click="createMicroservice">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/utils/axios.js'
import { useRouter } from 'vue-router'
import { handleError, handleSuccess } from '@/utils/toastHandler.js'

const name = ref('')
const description = ref('')
const prefix = ref('')
const prod_url = ref('')
const dev_url = ref('')

const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const createMicroservice = async () => {
  try {
    const res = await api.post(`${gatewayUrl}/admin/microservices`, {
      name: name.value,
      description: description.value,
      prefix: prefix.value,
      prod_url: prod_url.value,
      dev_url: dev_url.value,
    })

    handleSuccess(`Microservice "${res.data.service.name}" has been created successfully`)

    name.value = ''
    description.value = ''
    prefix.value = ''
    prod_url.value = ''
    dev_url.value = ''

    router.push('/admin/microservices')
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}
</script>
