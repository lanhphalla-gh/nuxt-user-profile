import { ref } from 'vue'

export interface RoleFormData {
    id?: string
    name: string
    description: string
}

export const useRoleForm = () => {

    const route = useRoute()

    const router = useRouter()


    const form = ref<RoleFormData>({
        name: '',
        description: ''
    })


    const loading = ref(false)

    const errorMessage = ref('')

    const isEdit = ref(false)


    const loadRole = async () => {

        const id = route.query.id

        if (!id) {
            return
        }

        isEdit.value = true

        loading.value = true

        try {

            const response = await $fetch<any>(
                `/api/roles/${id}`
            )

            form.value = {
                id: response?.data?.id,
                name: response?.data?.name ?? '',
                description:
                    response?.data?.description ?? ''
            }

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to load role.'

        } finally {

            loading.value = false
        }
    }


    const submit = async () => {

        errorMessage.value = ''

        loading.value = true

        try {

            if (isEdit.value && form.value.id) {

                await $fetch(
                    `/api/roles/${form.value.id}`,
                    {
                        method: 'PUT',
                        body: form.value
                    }
                )

            } else {

                await $fetch(
                    '/api/roles',
                    {
                        method: 'POST',
                        body: {
                            name: form.value.name,
                            description:
                                form.value.description
                        }
                    }
                )
            }


            await router.push(
                '/role/role-list'
            )

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to save role.'

        } finally {

            loading.value = false
        }
    }


    return {
        form,
        loading,
        errorMessage,
        isEdit,
        loadRole,
        submit
    }
}