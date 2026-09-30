<template>
    <section class="user-view-page">

        <div class="user-view-header">

            <div>

                <button type="button" class="back-button" @click="backToList">
                    ← Back to Users
                </button>

                <h1>
                    User Details
                </h1>

                <p>
                    View user account information.
                </p>

            </div>

            <button v-if="user" type="button" class="edit-user-button" @click="editUser">
                Edit User
            </button>

        </div>


        <!-- Error -->
        <div v-if="error" class="view-message view-error">
            {{ error }}
        </div>


        <!-- Loading -->
        <div v-if="loading" class="view-loading">
            <div class="loading-spinner"></div>

            <span>
                Loading user...
            </span>
        </div>


        <!-- User -->
        <div v-else-if="user" class="user-detail-card">

            <div class="user-profile-header">

                <div class="large-user-avatar">
                    {{ user.username.charAt(0).toUpperCase() }}
                </div>

                <div>

                    <h2>
                        {{ user.username }}
                    </h2>

                    <p>
                        {{ user.email }}
                    </p>

                    <span class="role-badge">
                        {{ user.roleName }}
                    </span>

                </div>

            </div>


            <div class="detail-section">

                <div class="detail-section-header">

                    <h3>
                        Account Information
                    </h3>

                    <p>
                        Basic information about this user.
                    </p>

                </div>


                <div class="detail-grid">

                    <div class="detail-item">

                        <span>
                            User ID
                        </span>

                        <strong>
                            {{ user.id }}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            Username
                        </span>

                        <strong>
                            {{ user.username }}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            Email
                        </span>

                        <strong>
                            {{ user.email }}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            Role
                        </span>

                        <strong>
                            {{ user.roleName }}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            Role ID
                        </span>

                        <strong>
                            {{ user.roleId }}
                        </strong>

                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<script setup lang="ts">
import { useUserView } from '../../composables/user/UserView'

const {
    user,
    loading,
    error,
    editUser,
    backToList
} = useUserView()
</script>