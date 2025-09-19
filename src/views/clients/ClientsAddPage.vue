<template>
  <div class="card-wrapper">
    <div class="card">
      <h2>Add New Client</h2>
      <input v-model="name" type="text" placeholder="Enter client name" required/>
      <textarea v-model="description" placeholder="Enter description"></textarea>
      <input v-model="contact_person" type="text" placeholder="Enter contact person" />
      <input v-model="contact_email" type="email" placeholder="Enter contact email"/>
      <input v-model="contact_phone" type="text" placeholder="Enter contact phone" />
      <select v-model="status">
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
      <select v-model="is_internal">
        <option :value="false">External Client</option>
        <option :value="true">Internal Microservice</option>
      </select>
      <button class="button button--primary" @click="createClient">Save</button>
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
const contact_person = ref('')
const contact_email = ref('')
const contact_phone = ref('')
const status = ref('active')
const is_internal = ref(true)

const router = useRouter()
const gatewayUrl = import.meta.env.VITE_GATEWAY_URL

const createClient = async () => {
  try {
    const res = await api.post(`${gatewayUrl}/admin/clients`, {
      name: name.value,
      description: description.value,
      contact_person: contact_person.value,
      contact_email: contact_email.value,
      contact_phone: contact_phone.value,
      status: status.value,
      is_internal: is_internal.value,
    })

    handleSuccess(`Client "${res.data.name}" has been created successfully!`)

    // Clear form
    name.value = ''
    description.value = ''
    contact_person.value = ''
    contact_email.value = ''
    contact_phone.value = ''
    status.value = 'active'
    is_internal.value = true

    // Redirect to clients list
    router.push('/admin/clients')
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}
</script>