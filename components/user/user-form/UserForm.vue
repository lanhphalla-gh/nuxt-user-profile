<template>
    <section class="user-form-page">

        <div class="user-form-header">

            <div>

                <button type="button" class="back-button" @click="cancel">
                    ← Back to Users
                </button>

                <h1>
                    {{ isEdit ? 'Edit User' : 'Create User' }}
                </h1>

                <p>
                    {{
                        isEdit
                            ? 'Update user information and role.'
                            : 'Create a new user account.'
                    }}
                </p>

            </div>

        </div>


        <!-- Error -->
        <div v-if="error" class="form-message form-error">
            {{ error }}
        </div>


        <!-- Success -->
        <div v-if="success" class="form-message form-success">
            {{ success }}
        </div>


        <!-- Form -->
        <div class="user-form-card">

            <div v-if="loading && isEdit" class="form-loading">
                Loading user...
            </div>

            <form v-else @submit.prevent="saveUser">

                <div class="form-section">

                    <div class="form-section-title">
                        <h2>Basic Information</h2>

                        <p>
                            Enter the user's account information.
                        </p>
                    </div>


                    <div class="form-grid">

                        <!-- Username -->
                        <div class="form-group">

                            <label for="username">
                                Username
                                <span>*</span>
                            </label>

                            <input id="username" v-model="username" type="text" placeholder="Enter username"
                                autocomplete="username" />

                        </div>


                        <!-- Email -->
                        <div class="form-group">

                            <label for="email">
                                Email
                                <span>*</span>
                            </label>

                            <input id="email" v-model="email" type="email" placeholder="Enter email"
                                autocomplete="email" />

                        </div>


                        <!-- Password -->
                        <div class="form-group">

                            <label for="password">
                                Password
                                <span v-if="!isEdit">*</span>
                            </label>

                            <input id="password" v-model="password" type="password" :placeholder="isEdit
                                    ? 'Leave empty to keep current password'
                                    : 'Enter password'
                                " autocomplete="new-password" />

                            <small v-if="isEdit">
                                Leave empty if you do not want to change the password.
                            </small>

                        </div>


                        <!-- Role -->
                        <div class="form-group">

                            <label for="role">
                                Role
                                <span>*</span>
                            </label>

                            <select id="role" v-model="roleId" :disabled="loadingRoles">

                                <option value="" disabled>
                                    {{
                                        loadingRoles
                                            ? 'Loading roles...'
                                    : 'Select a role'
                                    }}
                                </option>

                                <option v-for="role in roles" :key="role.id" :value="role.id">
                                    {{ role.name }}
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                <!-- Actions -->
                <div class="form-actions">

                    <button type="button" class="cancel-button" @click="cancel">
                        Cancel
                    </button>

                    <button type="submit" class="save-button" :disabled="loading">
                        {{
                            loading
                                ? 'Saving...'
                                : isEdit
                                    ? 'Update User'
                        : 'Create User'
                        }}
                    </button>

                </div>

            </form>

        </div>

    </section>
</template>

<script setup lang="ts">
import { useUserForm } from './UserForm'

const {
    isEdit,

    username,
    email,
    password,
    roleId,

    roles,

    loading,
    loadingRoles,

    error,
    success,

    saveUser,
    cancel
} = useUserForm()
</script>