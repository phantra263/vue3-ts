<script setup lang="ts">
  import Timeline from '../components/Timeline.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <Timeline />
    </template>

    <template #fallback> loading... </template>
  </Suspense>
</template>
