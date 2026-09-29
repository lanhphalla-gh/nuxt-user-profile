<template>
    <UserView />
</template>

<script setup lang="ts">
import UserView from '~/components/user/user-view/UserView.vue';


definePageMeta({
    middleware: 'auth'
})

</script>