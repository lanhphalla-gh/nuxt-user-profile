<template>
    <header class="dashboard-header">

        <div class="header-left">
            <button class="menu-button" type="button" aria-label="Toggle sidebar" @click="emit('toggle-sidebar')">
                ☰
            </button>

            <div class="header-title">
                <h1>Dashboard</h1>
                <p>Welcome back</p>
            </div>
        </div>

        <div class="header-right">

            <div class="user-info">
                <div class="user-avatar">
                    {{ userInitial }}
                </div>

                <div class="user-details">
                    <span class="username">
                        {{ user?.username || 'User' }}
                    </span>

                    <span class="user-role">
                        {{ user?.role || 'USER' }}
                    </span>
                </div>
            </div>

            <button class="logout-button" type="button" @click="handleLogout">
                Logout
            </button>

        </div>

    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardHeader } from './DashboardHeader'

const emit = defineEmits<{
    'toggle-sidebar': []
}>()

const {
    user,
    handleLogout
} = useDashboardHeader()

const userInitial = computed(() => {
    const username = user.value?.username || 'U'

    return username.charAt(0).toUpperCase()
})
</script>