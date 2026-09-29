<script setup lang="ts">

import { onMounted } from 'vue'

import { usePermissionForm } from './PermissionForm'


const {
    form,
    loading,
    errorMessage,
    isEdit,
    loadPermission,
    submit
} = usePermissionForm()


onMounted(() => {
    loadPermission()
})

</script>


<template>

    <div class="permission-form">

        <!-- Header -->
        <div class="permission-form-header">

            <div>

                <h1>
                    {{ isEdit
                        ? 'Edit Permission'
                        : 'Create Permission'
                    }}
                </h1>

                <p>
                    {{
                        isEdit
                            ? 'Update permission information.'
                            : 'Create a new system permission.'
                    }}
                </p>

            </div>

        </div>


        <!-- Error -->
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>


        <!-- Form -->
        <form @submit.prevent="submit">

            <!-- Name -->
            <div class="form-group">

                <label>
                    Permission Name
                </label>

                <input v-model="form.name" type="text" placeholder="Example: VIEW_USER" required />

            </div>


            <!-- Description -->
            <div class="form-group">

                <label>
                    Description
                </label>

                <textarea v-model="form.description" placeholder="Enter permission description" rows="4" />

            </div>


            <!-- Actions -->
            <div class="form-actions">

                <NuxtLink to="/permission/permission-list" class="btn-secondary">
                    Cancel
                </NuxtLink>


                <button type="submit" class="btn-primary" :disabled="loading">
                    {{
                        loading
                            ? 'Saving...'
                            : 'Save'
                    }}
                </button>

            </div>

        </form>

    </div>

</template>


<style scoped src="~/styles/permission/permission-form.css"></style>