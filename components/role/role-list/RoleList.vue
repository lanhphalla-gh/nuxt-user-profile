<script setup lang="ts">

import { useRoleList } from './RoleList'

const {
    roles,
    loading,
    errorMessage,
    loadRoles
} = useRoleList()

</script>


<template>

    <div class="role-list">

        <!-- Header -->
        <div class="role-list-header">

            <div>
                <h1>Roles</h1>

                <p>
                    Manage system roles.
                </p>
            </div>

            <NuxtLink to="/role/role-form" class="btn-primary">
                + Add Role
            </NuxtLink>

        </div>


        <!-- Error -->
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}

            <button @click="loadRoles">
                Retry
            </button>
        </div>


        <!-- Loading -->
        <div v-if="loading" class="loading">
            Loading roles...
        </div>


        <!-- Table -->
        <div v-else class="table-container">

            <table>

                <thead>

                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>

                </thead>


                <tbody>

                    <tr v-for="(role, index) in roles" :key="role.id">

                        <td>
                            {{ index + 1 }}
                        </td>

                        <td>
                            {{ role.name }}
                        </td>

                        <td>
                            {{ role.description || '-' }}
                        </td>

                        <td>

                            <NuxtLink :to="`/role/role-view?id=${role.id}`">
                                View
                            </NuxtLink>

                            <NuxtLink :to="`/role/role-form?id=${role.id}`">
                                Edit
                            </NuxtLink>

                        </td>

                    </tr>


                    <tr v-if="roles.length === 0">

                        <td colspan="4" class="empty">
                            No roles found.
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</template>


<style scoped src="~/styles/role/role-list.css"></style>