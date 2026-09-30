import { computed, onMounted, ref } from 'vue'
import { userService } from '~/services/user'
import type { User } from '~/types/user'

export function useUserList() {

    const users = ref<User[]>([])

    const loading = ref(false)
    const error = ref('')
    const search = ref('')

    const deletingId = ref<string | null>(null)

    const filteredUsers = computed(() => {

        const keyword =
            search.value
                .trim()
                .toLowerCase()

        if (!keyword) {
            return users.value
        }

        return users.value.filter(user => {
            return (
                user.username
                    .toLowerCase()
                    .includes(keyword) ||

                user.email
                    .toLowerCase()
                    .includes(keyword) ||

                user.roleName
                    .toLowerCase()
                    .includes(keyword)
            )
        })
    })

    const loadUsers = async () => {

        loading.value = true
        error.value = ''

        try {
            users.value =
                await userService.list()

        } catch (err) {

            console.error(err)

            error.value =
                'Failed to load users.'

        } finally {
            loading.value = false
        }
    }

    const viewUser = async (id: string) => {
        await navigateTo({
            path: '/user/user-view',
            query: { id }
        })
    }

    const editUser = async (id: string) => {
        await navigateTo({
            path: '/user/user-form',
            query: {
                id
            }
        })
    }

    const createUser = async () => {
        await navigateTo('/user/user-form')
    }

    const deleteUser = async (user: User) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${user.username}"?`
            )

        if (!confirmed) {
            return
        }

        deletingId.value = user.id
        error.value = ''

        try {

            await userService.delete(
                user.id
            )

            users.value =
                users.value.filter(
                    item => item.id !== user.id
                )

        } catch (err) {

            console.error(err)

            error.value =
                'Failed to delete user.'

        } finally {
            deletingId.value = null
        }
    }

    onMounted(() => {
        loadUsers()
    })

    return {
        users,
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
    }
}