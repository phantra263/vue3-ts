
import { RouterLink } from 'vue-router';

<template>
  <nav class="nav">
    <RouterLink to="/posts/new">New Post</RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  margin-bottom: 30px;
}
a {
  padding: 5px;
  border: 1px solid;
  margin-bottom: 30px;
}
</style>