# Kubik Gateway Admin Frontend
Version: 1.0.0

**Frontend admin panel** for Kubik Gateway, built with **Vue 3**, **Vite**, and **SCSS**.

Manage users, clients, API keys, and microservices through a clean and responsive admin interface.

---

## Features

- **Users Management:** list, add, edit, delete users with password reset  
- **Clients Management:** list, add, edit, delete clients with contact info and status  
- **API Keys:** manage API keys with optional IP restrictions  
- **Microservices:** manage microservices with dev/prod URLs  
- **Cache Management:** reload cache from navbar  
- **Authentication:** superuser and admin roles, token-based login  
- **Toasts:** English notifications for success/error with HTTP status  

---

## Getting Started

### Requirements

- Node.js 18+  
- npm  

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

Default dev server: `http://localhost:3002`.

---

## Environment Variables

**.env**
```ini
VITE_PORT=
VITE_APP_NAME=Gateway
VITE_APP_VERSION=1.0.0
```

**.env.development**
```ini
VITE_GATEWAY_URL=
```

**.env.production**
```ini
VITE_GATEWAY_URL=
```

---

## Routing

**Public:**
- `/` — Home
- `/login` — Login  

**Admin (requires auth):**
- `/admin` — Dashboard
- `/admin/users` — Users list
- `/admin/users/add` — Add user
- `/admin/users/edit/:id` — Edit user
- `/admin/clients` — Clients list
- `/admin/clients/add` — Add client
- `/admin/clients/edit/:id` — Edit client
- `/admin/apikeys` — API keys list
- `/admin/apikeys/add` — Add API key
- `/admin/apikeys/edit/:id` — Edit API key
- `/admin/microservices` — Microservices list
- `/admin/microservices/add` — Add microservice
- `/admin/microservices/edit/:id` — Edit microservice
- `/admin/admindocs` — Admin documentation
- `/admin/gatewaydocs` — Gateway documentation

---

## Authentication & Roles

- **Superuser:** created on backend migration; cannot be edited/deleted via admin panel  
- **Admin:** can be created in admin panel; all admins have equal rights  
- **Login:** token stored in `localStorage`  

---

## Toast Notifications

All API actions show notifications using `utils/toastHandler.js`:

- **Success:** green toast  
- **Error:** red toast with HTTP status and error message  
- All messages are in **English**  

---

## Dependencies

- **Vue 3** — frontend framework  
- **Vue Router** — routing  
- **Pinia** — state management  
- **Axios** — HTTP requests  
- **vue-toastification** — toast notifications  
- **SCSS** — styling  
- **Vite** — build tool  

---

## Notes

- SCSS is modular: variables, typography, layouts, elements (buttons, inputs, tables)  
- Axios base URL is configured via `.env`  
- Components follow consistent CRUD patterns  
- Navbar provides Add, Refresh, and Reload Cache buttons

---

## License
This project is licensed under the PolyForm Noncommercial 1.0.0 License.  
You may use, modify, and distribute this project **only for non-commercial purposes**.  
See the [LICENSE](LICENSE) file for details.