<template>
  <div class="card-wrapper">
    <div class="doc-card">
      <h1>Admin Panel Documentation</h1>
      <p>Welcome to the Kubik Admin Panel. This documentation describes all the main features you can access.</p>

      <section>
        <h2>Users Management</h2>
        <ul>
          <li><strong>View Users:</strong> Navigate to <code>/admin/users</code> to see all registered admin users.</li>
          <li><strong>Add User:</strong> Click "Add User" to create a new admin. You need to provide username and password.</li>
          <li><strong>Edit User:</strong> Click ✏️ on a user row to update username or password.</li>
          <li><strong>Delete User:</strong> Click 🗑️ to remove a user. Superusers cannot be deleted.</li>
        </ul>
      </section>

      <section>
        <h2>Clients Management</h2>
        <ul>
          <li><strong>View Clients:</strong> Navigate to <code>/admin/clients</code> to see all clients.</li>
          <li><strong>Add Client:</strong> Provide name, description, contact person, email, phone, status, and whether it is an internal system client (<code>is_internal</code>).</li>
          <li><strong>Edit Client:</strong> Update client information by clicking ✏️. You can also change the <code>is_internal</code> flag to mark the client as internal or external.</li>
          <li><strong>Delete Client:</strong> Click 🗑️ to remove a client.</li>
          <li><strong>Is internal Flag:</strong> Indicates whether the client is an internal microservice of the Kubik system (<code>true</code>) or an external client (<code>false</code>).</li>
        </ul>
      </section>

      <section>
        <h2>API Keys Management</h2>
        <ul>
          <li><strong>View API Keys:</strong> Navigate to <code>/admin/apikeys</code>.</li>
          <li><strong>Add API Key:</strong> Assign it to a client, set validity period, status, and optionally restrict by IPs.</li>
          <li><strong>Edit API Key:</strong> Update client, status, validity period, or IP restrictions.</li>
          <li><strong>Delete API Key:</strong> Remove keys if no longer needed.</li>
        </ul>
      </section>

      <section>
        <h2>Microservices Management</h2>
        <ul>
          <li><strong>View Microservices:</strong> Navigate to <code>/admin/microservices</code> to see all registered microservices.</li>
          <li><strong>Add Microservice:</strong> Provide name, description, and URL prefix. The prefix is used by the gateway to route requests to this service.</li>
          <li><strong>Edit Microservice:</strong> Update name, description, or prefix by clicking ✏️.</li>
          <li><strong>Delete Microservice:</strong> Click 🗑️ to remove a microservice.</li>
          <li><strong>Prefix:</strong> Each microservice has a unique prefix (e.g., <code>API</code>, <code>PIM</code>) that the gateway uses to determine routing.</li>
        </ul>
      </section>

      <section>
        <h2>Cache Management</h2>
        <ul>
          <li><strong>Reload Cache:</strong> After adding, editing, or deleting any data (clients, API keys, or microservices) in the admin panel, you must reload the cache by clicking the <strong>Reload cache</strong> button. Otherwise, the gateway will continue using the old data until the cache is refreshed.</li>
          <li>The cache reload endpoint calls <code>loadCache()</code> on the server and updates the in-memory store used by the gateway.</li>
          <li>You can monitor the current cache content in the admin panel console/logs after reloading.</li>
        </ul>
      </section>

      <section>
        <h2>Tips</h2>
        <ul>
          <li>All actions show confirmation toasts for success or errors.</li>
          <li>Superusers cannot be deleted or modified by other admins.</li>
          <li>IP restrictions allow limiting API key usage to specific addresses.</li>
          <li>Internal clients (<code>is_internal</code> = true) are used by system microservices and may have different handling or privileges.</li>
          <li>Microservices added here are the endpoints that the gateway proxies requests to, so ensure prefixes are unique and meaningful.</li>
        </ul>
      </section>
    </div>
  </div>
</template>


<style scoped>
.card {
    justify-content: flex-start !important;
}

.doc-card {
    width: 900px;
    background: #fff;
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
}

ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

code {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}
</style>
