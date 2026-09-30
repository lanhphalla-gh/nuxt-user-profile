<template>
    <UserList />
</template>

<script setup lang="ts">
import UserList from '~/components/user/UserList.vue';


definePageMeta({
    middleware: 'auth'
})

</script>