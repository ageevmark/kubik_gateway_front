import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'

import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(router)

// Настройка глобальных опций тостов
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT, // снизу справа
  timeout: 3000,                   // авто-скрытие через 3 сек
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false
})

app.mount('#app')
