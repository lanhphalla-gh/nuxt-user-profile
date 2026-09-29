<template>
    <div class="dashboard-layout">

        <DashboardHeader @toggle-sidebar="toggleSidebar" />

        <div class="dashboard-main">

            <DashboardSidebar :is-open="sidebarOpen" @close-sidebar="closeSidebar" />

            <main class="dashboard-page-content">
                <DashboardContent />
            </main>

        </div>

        <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    middleware: 'auth'
})

const sidebarOpen = ref(false)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
    sidebarOpen.value = false
}
</script>