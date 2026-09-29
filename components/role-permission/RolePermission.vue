<script setup lang="ts">

import {
    useRolePermission
} from './RolePermission'


const {

    roles,

    permissions,

    selectedRoleId,

    loading,

    saving,

    errorMessage,

    successMessage,

    onRoleChange,

    togglePermission,

    hasPermission,

    save

} = useRolePermission()

</script>


<template>

    <div class="role-permission">

        <!-- =================================================
             Header
        ================================================== -->

        <div class="role-permission-header">

            <div>

                <h1>
                    Role Permission
                </h1>

                <p>
                    Assign permissions to a role.
                </p>

            </div>

        </div>


        <!-- =================================================
             Error
        ================================================== -->

        <div v-if="errorMessage" class="message error-message">
            {{ errorMessage }}
        </div>


        <!-- =================================================
             Success
        ================================================== -->

        <div v-if="successMessage" class="message success-message">
            {{ successMessage }}
        </div>


        <!-- =================================================
             Loading
        ================================================== -->

        <div v-if="loading" class="loading">
            Loading...
        </div>


        <!-- =================================================
             Content
        ================================================== -->

        <div v-else class="role-permission-card">

            <!-- =================================================
                 Role
            ================================================== -->

            <div class="form-group">

                <label for="role">
                    Role
                </label>


                <select id="role" v-model="selectedRoleId" @change="onRoleChange">

                    <option value="" disabled>
                        Select a role
                    </option>


                    <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{ role.name }}
                    </option>

                </select>

            </div>


            <!-- =================================================
                 Permissions
            ================================================== -->

            <div class="permissions-section">

                <div class="section-header">

                    <div>

                        <h2>
                            Permissions
                        </h2>

                        <p>
                            Select permissions for this role.
                        </p>

                    </div>


                    <span class="permission-count">

                        {{
                            selectedRoleId
                                ? permissions.filter(
                                    permission =>
                                        permission.id &&
                                        hasPermission(permission.id)
                                ).length
                                : 0
                        }}

                        /
                        {{ permissions.length }}

                    </span>

                </div>


                <div v-if="!selectedRoleId" class="select-role-message">
                    Please select a role first.
                </div>


                <div v-else-if="permissions.length === 0" class="empty-message">
                    No permissions found.
                </div>


                <div v-else class="permission-list">

                    <label v-for="permission in permissions" :key="permission.id" class="permission-item">

                        <input type="checkbox" :checked="permission.id
                                ? hasPermission(permission.id)
                                : false
                            " @change="
                                permission.id &&
                                togglePermission(permission.id)
                                " />


                        <div class="permission-info">

                            <strong>
                                {{ permission.name }}
                            </strong>

                            <span>
                                {{
                                    permission.description ||
                                    'No description'
                                }}
                            </span>

                        </div>

                    </label>

                </div>

            </div>


            <!-- =================================================
                 Actions
            ================================================== -->

            <div class="form-actions">

                <button type="button" class="btn-secondary" @click="selectedRoleId = ''">
                    Clear
                </button>


                <button type="button" class="btn-primary" :disabled="saving ||
                    !selectedRoleId
                    " @click="save">

                    {{
                        saving
                            ? 'Saving...'
                            : 'Save Permissions'
                    }}

                </button>

            </div>

        </div>

    </div>

</template>


<style scoped src="~/styles/role-permission/role-permission.css"></style>