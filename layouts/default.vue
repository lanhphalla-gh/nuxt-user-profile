<script setup lang="ts">
import { ref } from 'vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
    isSidebarOpen.value = false
}
</script>

<template>
    <div class="app-layout">

        <DashboardSidebar :is-open="isSidebarOpen" @close-sidebar="closeSidebar" />

        <div class="app-content">

            <DashboardHeader @toggle-sidebar="toggleSidebar" />

            <main>
                <slot />
            </main>

        </div>

    </div>
</template>