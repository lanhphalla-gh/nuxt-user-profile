<template>
  <div class="auth-layout">

    <!-- <header>
      <h2>Nuxt User Profile</h2>
    </header> -->

    <main>
      <slot />
    </main>

  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
}

.auth-layout header {
  padding: 20px;
  text-align: center;
  background: white;
  border-bottom: 1px solid #ddd;
}

.auth-layout main {
  min-height: calc(100vh - 70px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
}
</style>