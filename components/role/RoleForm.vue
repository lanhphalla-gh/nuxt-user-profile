<script setup lang="ts">

import { onMounted } from 'vue'

import { useRoleForm } from '../../composables/role/RoleForm'


const {
    form,
    loading,
    errorMessage,
    isEdit,
    loadRole,
    submit
} = useRoleForm()


onMounted(() => {
    loadRole()
})

</script>


<template>

    <div class="role-form">

        <!-- Header -->
        <div class="role-form-header">

            <div>

                <h1>
                    {{ isEdit ? 'Edit Role' : 'Create Role' }}
                </h1>

                <p>
                    {{
                        isEdit
                            ? 'Update role information.'
                            : 'Create a new system role.'
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
                    Role Name
                </label>

                <input v-model="form.name" type="text" placeholder="Enter role name" required />

            </div>


            <!-- Description -->
            <div class="form-group">

                <label>
                    Description
                </label>

                <textarea v-model="form.description" placeholder="Enter role description" rows="4" />

            </div>


            <!-- Actions -->
            <div class="form-actions">

                <NuxtLink to="/role/role-list" class="btn-secondary">
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


<style scoped src="~/styles/role/role-form.css"></style>