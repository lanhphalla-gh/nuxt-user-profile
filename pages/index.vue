<template>

  <div>

    <h1>
      Dashboard
    </h1>

    <p>
      Welcome to User Profile Management.
    </p>

    <div class="cards">

      <NuxtLink
        to="/user/user-list"
        class="card"
      >
        <h2>User</h2>
        <p>
          Manage users.
        </p>
      </NuxtLink>

            <NuxtLink
        to="/role/role-list"
        class="card"
      >
        <h2>Role</h2>
        <p>
          Manage roles.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/permission/permission-list"
        class="card"
      >
        <h2>Permission</h2>
        <p>
          Manage permissions.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/role-permission/role-permission"
        class="card"
      >
        <h2>Role-Permission</h2>
        <p>
          Assign permissions to roles.
        </p>
      </NuxtLink>

    </div>

  </div>

</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

</script>

<style scoped>
.cards {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;
}

.card {
  padding: 20px;

  background: white;

  border: 1px solid #ddd;
  border-radius: 10px;
}

@media (max-width: 800px) {

  .cards {
    grid-template-columns: 1fr;
  }

}
</style>