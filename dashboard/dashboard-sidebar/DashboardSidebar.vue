<template>
    <aside class="dashboard-sidebar" :class="{ 'sidebar-open': isOpen }">

        <div class="sidebar-logo">
            <h2>User Profile</h2>
        </div>

        <nav class="sidebar-menu">

            <NuxtLink v-for="item in visibleMenuItems" :key="item.path" :to="item.path" class="sidebar-item"
                active-class="sidebar-item-active" @click="handleMenuClick">
                <span class="sidebar-icon">
                    {{ item.icon }}
                </span>

                <span class="sidebar-label">
                    {{ item.label }}
                </span>
            </NuxtLink>

        </nav>

    </aside>
</template>

<script setup lang="ts">
import { useDashboardSidebar } from './DashboardSidebar'

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    'close-sidebar': []
}>()

const {
    visibleMenuItems
} = useDashboardSidebar()

const handleMenuClick = () => {
    emit('close-sidebar')
}
</script>