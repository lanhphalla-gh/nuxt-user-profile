import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'


// ===========================================================
// Login Form
// -----------------------------------------------------------
// Handles:
// - Login form data
// - Login request
// - Loading state
// - Error message
// - Redirect after successful login
// ===========================================================

export const useLoginForm = () => {

    // =========================================================
    // Form Data
    // =========================================================

    /**
     * Stores the username entered by the user.
     */
    const username = ref('')


    /**
     * Stores the password entered by the user.
     */
    const password = ref('')


    // =========================================================
    // UI State
    // =========================================================

    /**
     * Message displayed when login fails.
     */
    const errorMessage = ref('')


    // =========================================================
    // Authentication
    // =========================================================

    /**
     * Provides authentication actions and state.
     *
     * login  -> Sends login request to the backend.
     * loading -> Indicates whether login is processing.
     */
    const {
        login,
        loading
    } = useAuth()


    // =========================================================
    // Submit Login
    // =========================================================

    /**
     * Submits the login form.
     *
     * Flow:
     * 1. Clear previous error.
     * 2. Send username and password.
     * 3. Wait for login response.
     * 4. Redirect to dashboard after success.
     * 5. Display error message if login fails.
     */
    const submit = async () => {

        // -----------------------------------------------------
        // Clear Previous Error
        // -----------------------------------------------------

        errorMessage.value = ''


        try {

            // -------------------------------------------------
            // Login
            // -------------------------------------------------

            await login(
                username.value,
                password.value
            )


            // -------------------------------------------------
            // Login Successful
            // -------------------------------------------------

            /**
             * Redirect the user to the dashboard.
             */
            await navigateTo('/')


        } catch (error: any) {

            // -------------------------------------------------
            // Login Failed
            // -------------------------------------------------

            /**
             * Try to display the most useful error message.
             *
             * Priority:
             * 1. Backend response message
             * 2. JavaScript error message
             * 3. Default message
             */
            errorMessage.value =
                error?.data?.message ||
                error?.message ||
                'Login failed.'
        }
    }


    // =========================================================
    // Return
    // =========================================================

    /**
     * Expose form data and actions
     * to LoginForm.vue.
     */
    return {
        username,
        password,
        errorMessage,
        loading,
        submit
    }
}