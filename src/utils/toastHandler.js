// utils/toastHandler.js
import { useToast } from 'vue-toastification'

const toast = useToast()

export function handleError(error) {
  const status = error.response?.status || 'Error'
  const message = error.response?.data?.message || error.message || 'Unexpected error'
  toast.error(`[${status}] ${message}`)
}

export function handleSuccess(message) {
  toast.success(message)
}

export function handleInfo(message) {
  toast.info(message)
}

export function handleWarning(message) {
  toast.warning(message)
}
