<script setup lang="ts">

import { usePermissionList } from '../../composables/permission/PermissionList'

const {
    permissions,
    loading,
    errorMessage,
    loadPermissions
} = usePermissionList()

</script>


<template>

    <div class="permission-list">

        <!-- Header -->
        <div class="permission-list-header">

            <div>

                <h1>
                    Permissions
                </h1>

                <p>
                    Manage system permissions.
                </p>

            </div>


            <NuxtLink to="/permission/permission-form" class="btn-primary">
                + Add Permission
            </NuxtLink>

        </div>


        <!-- Error -->
        <div v-if="errorMessage" class="error-message">

            {{ errorMessage }}

            <button @click="loadPermissions">
                Retry
            </button>

        </div>


        <!-- Loading -->
        <div v-if="loading" class="loading">
            Loading permissions...
        </div>


        <!-- Table -->
        <div v-else class="table-container">

            <table>

                <thead>

                    <tr>

                        <th>#</th>

                        <th>Permission</th>

                        <th>Description</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    <tr v-for="(permission, index) in permissions" :key="permission.id">

                        <td>
                            {{ index + 1 }}
                        </td>

                        <td>
                            {{ permission.name }}
                        </td>

                        <td>
                            {{ permission.description || '-' }}
                        </td>

                        <td>

                            <NuxtLink :to="`/permission/permission-view?id=${permission.id}`">
                                View
                            </NuxtLink>

                            <NuxtLink :to="`/permission/permission-form?id=${permission.id}`">
                                Edit
                            </NuxtLink>

                        </td>

                    </tr>


                    <tr v-if="permissions.length === 0">

                        <td colspan="4" class="empty">
                            No permissions found.
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</template>


<style scoped src="~/styles/permission/permission-list.css"></style>