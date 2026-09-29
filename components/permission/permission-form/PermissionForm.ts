import { ref } from 'vue'

export interface PermissionFormData {
    id?: string
    name: string
    description: string
}

export const usePermissionForm = () => {

    const route = useRoute()

    const router = useRouter()


    const form = ref<PermissionFormData>({
        name: '',
        description: ''
    })


    const loading = ref(false)

    const errorMessage = ref('')

    const isEdit = ref(false)


    const loadPermission = async () => {

        const id = route.query.id

        if (!id) {
            return
        }

        isEdit.value = true

        loading.value = true

        try {

            const response = await $fetch<any>(
                `/api/permissions/${id}`
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
                'Failed to load permission.'

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
                    `/api/permissions/${form.value.id}`,
                    {
                        method: 'PUT',
                        body: form.value
                    }
                )

            } else {

                await $fetch(
                    '/api/permissions',
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
                '/permission/permission-list'
            )

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Failed to save permission.'

        } finally {

            loading.value = false
        }
    }


    return {
        form,
        loading,
        errorMessage,
        isEdit,
        loadPermission,
        submit
    }
}