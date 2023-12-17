<template>
  <p>Hello world</p>
  <p>{{ data }}</p>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>
