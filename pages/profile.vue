<template>
  <h1>Profile</h1>
  <p>User id: {{ user.userId }}</p>
  <p>Username: {{ user.username }}</p>
  <p>Username: {{ user.email }}</p>
  <form method="post" action="/api/logout" @submit.prevent="handleLogout">
    <input type="submit" value="Sign out" />
  </form>
</template>

<script lang="ts" setup>
import { useAuthenticatedUser } from "~/composables/auth";

definePageMeta({
  middleware: ["protected"]
});

const user = useAuthenticatedUser();

const handleLogout = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  await $fetch("/api/logout", {
    method: "POST",
    redirect: "manual"
  });
  await navigateTo("/login");
};
</script>
