<template>
  <div class="layout">

    <header class="header">

      <NuxtLink to="/">
        <strong>
          Nuxt User Profile
        </strong>
      </NuxtLink>

      <div v-if="user">
        <span>
          {{ user.username }}
        </span>

        <button
          @click="logout"
          class="logout-btn"
        >
          Logout
        </button>
      </div>

    </header>

    <div class="body">

      <aside class="sidebar">

        <NuxtLink to="/">
          Dashboard
        </NuxtLink>

        <NuxtLink to="/user">
          User
        </NuxtLink>

        <NuxtLink to="/permission">
          Permission
        </NuxtLink>

        <NuxtLink to="/role-permission">
          Role-Permission
        </NuxtLink>

      </aside>

      <main class="content">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';


const {
  user,
  logout
} = useAuth()

</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  background: white;
  border-bottom: 1px solid #ddd;
}

.header div {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.body {
  display: flex;
  min-height: calc(100vh - 64px);
}

.sidebar {
  width: 220px;
  padding: 20px;

  background: white;
  border-right: 1px solid #ddd;
}

.sidebar a {
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 6px;
}

.sidebar a.router-link-active {
  background: #eef4ff;
}

.content {
  flex: 1;
  padding: 25px;
}
</style>