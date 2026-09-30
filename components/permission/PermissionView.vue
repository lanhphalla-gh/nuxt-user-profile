<script setup lang="ts">

import { usePermissionView } from '../../composables/permission/PermissionView'


const {
    permission,
    loading,
    errorMessage
} = usePermissionView()

</script>


<template>

    <div class="permission-view">

        <!-- Header -->
        <div class="permission-view-header">

            <div>

                <h1>
                    Permission Details
                </h1>

                <p>
                    View permission information.
                </p>

            </div>


            <NuxtLink to="/permission/permission-list" class="btn-secondary">
                Back
            </NuxtLink>

        </div>


        <!-- Loading -->
        <div v-if="loading" class="loading">
            Loading permission...
        </div>


        <!-- Error -->
        <div v-else-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>


        <!-- Details -->
        <div v-else-if="permission" class="permission-details">

            <div class="detail-item">

                <span>
                    ID
                </span>

                <strong>
                    {{ permission.id }}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    Permission Name
                </span>

                <strong>
                    {{ permission.name }}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    Description
                </span>

                <strong>
                    {{ permission.description || '-' }}
                </strong>

            </div>


            <div class="detail-actions">

                <NuxtLink :to="`/permission/permission-form?id=${permission.id}`" class="btn-primary">
                    Edit
                </NuxtLink>

            </div>

        </div>

    </div>

</template>


<style scoped src="~/styles/permission/permission-view.css"></style>