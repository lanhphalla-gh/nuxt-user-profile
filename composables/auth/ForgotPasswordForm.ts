import { ref } from 'vue'
import { authService } from '~/services/auth'

export const useForgotPassword = () => {

    const username = ref('')

    const loading = ref(false)

    const errorMessage = ref('')
    const successMessage = ref('')

    const submit = async () => {

        errorMessage.value = ''
        successMessage.value = ''

        loading.value = true

        try {

            await authService.forgotPassword(
                username.value
            )

            successMessage.value =
                'Password recovery request submitted.'

        } catch (error: any) {

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Request failed.'

        } finally {

            loading.value = false

        }
    }

    return {
        username,
        loading,
        errorMessage,
        successMessage,
        submit
    }
}
