import { createRouter, createWebHistory } from 'vue-router'

// Лейауты
import PublicLayout from '@/layouts/PublicLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import UsersPage from '../views/users/UsersPage.vue'
import UsersAddPage from '../views/users/UsersAddPage.vue'
import UsersEditPage from '../views/users/UsersEditPage.vue'
import ClientsPage from '../views/clients/ClientsPage.vue'
import ClientsAddPage from '../views/clients/ClientsAddPage.vue'
import ClientsEditPage from '../views/clients/ClientsEditPage.vue'
import ApiKeysPage from '../views/apiKeys/apiKeysPage.vue'
import ApiKeysAddPage from '../views/apiKeys/apiKeysAdd.vue'
import ApiKeysEditPage from '../views/apiKeys/apiKeysEdit.vue'
import AdminDocs from '../views/docs/AdminDocs.vue'
import MicroservicesPage from '../views/microservices/MicroservicesPage.vue'
import MicroservicesAddPage from '../views/microservices/MicroservicesAddPage.vue'
import MicroservicesEditPage from '../views/microservices/MicroservicesEditPage.vue'
import GatewayDocs from '../views/docs/GatewayDocs.vue'

const routes = [
  { 
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'Home', component: HomePage },
      { path: 'login', name: 'Login', component: LoginPage },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'Dashboard', component: DashboardPage },
      { path: 'users', name: 'Users', component: UsersPage },
      { path: 'users/add', name: 'UsersAdd', component: UsersAddPage },
      { path: 'users/edit/:id', name: 'UsersEdit', component: UsersEditPage },
      { path: 'clients', name: 'Clients', component: ClientsPage },
      { path: 'clients/add', name: 'ClientsAdd', component: ClientsAddPage },
      { path: 'clients/edit/:id', name: 'ClientsEdit', component: ClientsEditPage },
      { path: 'apikeys', name: 'ApiKeys', component: ApiKeysPage },
      { path: 'apikeys/add', name: 'ApiKeysAdd', component: ApiKeysAddPage },
      { path: 'apikeys/edit/:id', name: 'ApiKeysEdit', component: ApiKeysEditPage },
      { path: 'admindocs', name: 'AdminDocs', component: AdminDocs },
      { path: 'gatewaydocs', name: 'GatewayDocs', component: GatewayDocs },
      { path: 'microservices', name: 'Microservices', component: MicroservicesPage },
      { path: 'microservices/add', name: 'MicroservicesAdd', component: MicroservicesAddPage },
      { path: 'microservices/edit/:id', name: 'MicroservicesEdit', component: MicroservicesEditPage },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// простая защита маршрутов
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('adminToken')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
