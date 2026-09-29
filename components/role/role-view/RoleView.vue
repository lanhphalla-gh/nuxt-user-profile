<script setup lang="ts">

import { useRoleView } from './RoleView'


const {
    role,
    loading,
    errorMessage
} = useRoleView()

</script>


<template>

    <div class="role-view">

        <!-- Header -->
        <div class="role-view-header">

            <div>

                <h1>
                    Role Details
                </h1>

                <p>
                    View role information.
                </p>

            </div>


            <NuxtLink to="/role/role-list" class="btn-secondary">
                Back
            </NuxtLink>

        </div>


        <!-- Loading -->
        <div v-if="loading" class="loading">
            Loading role...
        </div>


        <!-- Error -->
        <div v-else-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>


        <!-- Details -->
        <div v-else-if="role" class="role-details">

            <div class="detail-item">

                <span>
                    ID
                </span>

                <strong>
                    {{ role.id }}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    Role Name
                </span>

                <strong>
                    {{ role.name }}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    Description
                </span>

                <strong>
                    {{ role.description || '-' }}
                </strong>

            </div>


            <div class="detail-actions">

                <NuxtLink :to="`/role/role-form?id=${role.id}`" class="btn-primary">
                    Edit
                </NuxtLink>

            </div>

        </div>

    </div>

</template>


<style scoped src="~/styles/role/role-view.css"></style>