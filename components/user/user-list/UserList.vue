<template>
    <section class="user-list-page">

        <!-- Header -->
        <div class="user-page-header">

            <div>
                <h1>User Management</h1>

                <p>
                    Manage users and their assigned roles.
                </p>
            </div>

            <button class="primary-button" type="button" @click="createUser">
                + Add User
            </button>

        </div>


        <!-- Toolbar -->
        <div class="user-toolbar">

            <div class="user-search">

                <span class="search-icon">
                    ⌕
                </span>

                <input v-model="search" type="text" placeholder="Search username, email, or role..." />

            </div>

            <button class="refresh-button" type="button" :disabled="loading" @click="loadUsers">
                ↻ Refresh
            </button>

        </div>


        <!-- Error -->
        <div v-if="error" class="user-error">
            {{ error }}
        </div>


        <!-- Loading -->
        <div v-if="loading" class="user-loading">
            <div class="loading-spinner"></div>

            <span>
                Loading users...
            </span>
        </div>


        <!-- Table -->
        <div v-else class="user-table-card">

            <div class="table-summary">

                <span>
                    Showing
                    <strong>{{ filteredUsers.length }}</strong>
                    users
                </span>

            </div>

            <div class="user-table-wrapper">

                <table class="user-table">

                    <thead>

                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>User ID</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="user in filteredUsers" :key="user.id">

                            <td>

                                <div class="user-cell">

                                    <div class="user-avatar">
                                        {{ user.username.charAt(0).toUpperCase() }}
                                    </div>

                                    <div>
                                        <strong>
                                            {{ user.username }}
                                        </strong>

                                        <small>
                                            User
                                        </small>
                                    </div>

                                </div>

                            </td>

                            <td>
                                {{ user.email }}
                            </td>

                            <td>

                                <span class="role-badge">
                                    {{ user.roleName }}
                                </span>

                            </td>

                            <td>
                                <span class="user-id">
                                    {{ user.id }}
                                </span>
                            </td>

                            <td>

                                <div class="table-actions">

                                    <button type="button" class="action-view" title="View" @click="viewUser(user.id)">
                                        View
                                    </button>

                                    <button type="button" class="action-edit" title="Edit" @click="editUser(user.id)">
                                        Edit
                                    </button>

                                    <button type="button" class="action-delete" title="Delete"
                                        :disabled="deletingId === user.id" @click="deleteUser(user)">
                                        {{
                                            deletingId === user.id
                                                ? 'Deleting...'
                                        : 'Delete'
                                        }}
                                    </button>

                                </div>

                            </td>

                        </tr>


                        <!-- Empty -->
                        <tr v-if="filteredUsers.length === 0">

                            <td colspan="5" class="empty-users">
                                <div class="empty-icon">
                                    👤
                                </div>

                                <strong>
                                    No users found
                                </strong>

                                <p>
                                    Try another search or create a new user.
                                </p>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </section>
</template>

<script setup lang="ts">
import { useUserList } from './UserList'

const {
    loading,
    error,
    search,
    filteredUsers,
    deletingId,
    loadUsers,
    viewUser,
    editUser,
    createUser,
    deleteUser
} = useUserList()
</script>