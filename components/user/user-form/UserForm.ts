import {
    computed,
    onMounted,
    ref
} from 'vue'

import {
    userService
} from '~/services/user'

import type {
    User,
    UserRequest
} from '~/types/user'

interface Role {
    id: string
    name: string
}

export function useUserForm() {

    const route = useRoute()

    const id = computed(() => {
        const value = route.query.id

        return typeof value === 'string'
            ? value
            : ''
    })

    const isEdit = computed(() => {
        return id.value !== ''
    })

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const roleId = ref('')

    const roles = ref<Role[]>([])

    const loading = ref(false)
    const loadingRoles = ref(false)

    const error = ref('')
    const success = ref('')

    const loadUser = async () => {

        if (!isEdit.value) {
            return
        }

        loading.value = true
        error.value = ''

        try {

            const user =
                await userService.getById(
                    id.value
                )

            username.value =
                user.username

            email.value =
                user.email

            roleId.value =
                user.roleId

        } catch (err) {

            console.error(err)

            error.value =
                'Failed to load user.'

        } finally {
            loading.value = false
        }
    }

    const loadRoles = async () => {

        loadingRoles.value = true

        try {

            const config =
                useRuntimeConfig()

            const response =
                await $fetch<any>(
                    `${config.public.apiBaseUrl}/role/list`,
                    {
                        method: 'GET',
                        credentials: 'include'
                    }
                )

            const data =
                response.data ?? response

            roles.value =
                Array.isArray(data)
                    ? data
                    : []

        } catch (err) {

            console.error(err)

            error.value =
                'Failed to load roles.'

        } finally {
            loadingRoles.value = false
        }
    }

    const validate = () => {

        if (!username.value.trim()) {
            error.value =
                'Username is required.'
            return false
        }

        if (!email.value.trim()) {
            error.value =
                'Email is required.'
            return false
        }

        if (!isEdit.value && !password.value) {
            error.value =
                'Password is required.'
            return false
        }

        if (!roleId.value) {
            error.value =
                'Role is required.'
            return false
        }

        return true
    }

    const saveUser = async () => {

        error.value = ''
        success.value = ''

        if (!validate()) {
            return
        }

        loading.value = true

        try {

            const request: UserRequest = {
                username:
                    username.value.trim(),

                email:
                    email.value.trim(),

                roleId:
                    roleId.value
            }

            if (password.value) {
                request.password =
                    password.value
            }

            if (isEdit.value) {

                await userService.update(
                    id.value,
                    request
                )

                success.value =
                    'User updated successfully.'

            } else {

                await userService.create(
                    request
                )

                success.value =
                    'User created successfully.'
            }

            setTimeout(() => {
                navigateTo('/user/user-list')
            }, 500)

        } catch (err: any) {

            console.error(err)

            error.value =
                err?.data?.message ??
                'Failed to save user.'

        } finally {
            loading.value = false
        }
    }

    const cancel = async () => {
        await navigateTo('/user/user-list')
    }

    onMounted(async () => {

        await Promise.all([
            loadRoles(),
            loadUser()
        ])

    })

    return {
        id,
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
    }
}