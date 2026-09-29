import { reactive, ref } from 'vue'
import { authService } from '~/services/auth'


/**
 * Register Form
 *
 * Handles:
 * - Registration form data
 * - Form validation
 * - Registration API request
 * - Loading state
 * - Success and error messages
 */
export const useRegisterForm = () => {

    // =========================================================
    // Form Data
    // =========================================================

    /**
     * Stores all values entered by the user.
     */
    const form = reactive({
        username: '',
        password: '',
        confirmPassword: ''
    })


    // =========================================================
    // UI State
    // =========================================================

    /**
     * Indicates whether the registration request is processing.
     */
    const loading = ref(false)

    /**
     * Message displayed when registration fails.
     */
    const errorMessage = ref('')

    /**
     * Message displayed after successful registration.
     */
    const successMessage = ref('')


    // =========================================================
    // Validation
    // =========================================================

    /**
     * Validates the registration form before
     * sending the request to the backend.
     */
    const validateForm = (): boolean => {

        // Check whether password and
        // confirmation password are the same.
        if (
            form.password !==
            form.confirmPassword
        ) {

            errorMessage.value =
                'Passwords do not match.'

            return false
        }

        return true
    }


    // =========================================================
    // Submit Registration
    // =========================================================

    /**
     * Submits the registration form.
     */
    const submit = async () => {

        // Clear previous messages.
        errorMessage.value = ''
        successMessage.value = ''


        // -----------------------------------------------------
        // Validate Form
        // -----------------------------------------------------

        if (!validateForm()) {
            return
        }


        // -----------------------------------------------------
        // Start Loading
        // -----------------------------------------------------

        loading.value = true


        try {

            // -------------------------------------------------
            // Call Registration API
            // -------------------------------------------------

            await authService.register(form)


            // -------------------------------------------------
            // Handle Success
            // -------------------------------------------------

            successMessage.value =
                'Registration successful. Please login.'


            // Clear form after successful registration.
            resetForm()


        } catch (error: any) {

            // -------------------------------------------------
            // Handle Error
            // -------------------------------------------------

            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Registration failed.'

        } finally {

            // -------------------------------------------------
            // Stop Loading
            // -------------------------------------------------

            loading.value = false
        }
    }


    // =========================================================
    // Reset Form
    // =========================================================

    /**
     * Clears all registration form fields.
     */
    const resetForm = () => {

        form.username = ''
        form.password = ''
        form.confirmPassword = ''
    }


    // =========================================================
    // Return
    // =========================================================

    /**
     * Expose form data and functions
     * to RegisterForm.vue.
     */
    return {

        // Form
        form,

        // UI State
        loading,
        errorMessage,
        successMessage,

        // Actions
        submit,
        resetForm
    }
}