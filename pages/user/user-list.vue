<template>
    <UserList />
</template>

<script setup lang="ts">
import UserList from '~/components/user/user-list/UserList.vue';


definePageMeta({
    middleware: 'auth'
})

</script>