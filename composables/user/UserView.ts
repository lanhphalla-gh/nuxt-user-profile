import {
    computed,
    onMounted,
    ref
} from 'vue'

import {
    userService
} from '~/services/user'

import type {
    User
} from '~/types/user'

export function useUserView() {

    const route = useRoute()

    const id = computed(() => {

        const value =
            route.query.id

        return typeof value === 'string'
            ? value
            : ''
    })

    const user = ref<User | null>(null)

    const loading = ref(false)
    const error = ref('')

    const loadUser = async () => {

        if (!id.value) {

            error.value =
                'User ID is missing.'

            return
        }

        loading.value = true
        error.value = ''

        try {

            user.value =
                await userService.getById(
                    id.value
                )

        } catch (err) {

            console.error(err)

            error.value =
                'Failed to load user.'

        } finally {
            loading.value = false
        }
    }

    const editUser = async () => {

        if (!id.value) {
            return
        }

        await navigateTo({
            path: '/user/user-form',
            query: {
                id: id.value
            }
        })
    }

    const backToList = async () => {
        await navigateTo('/user/user-list')
    }

    onMounted(() => {
        loadUser()
    })

    return {
        user,
        loading,
        error,
        editUser,
        backToList
    }
}