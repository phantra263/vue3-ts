<script setup lang="ts">
import Navbar from './components/Navbar.vue'
// import Timeline from './components/Timeline.vue';
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
    <!-- <Suspense>
      <template #default>
        <Timeline />
      </template>

      <template #fallback>
        loading...
      </template>
    </Suspense> -->
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
