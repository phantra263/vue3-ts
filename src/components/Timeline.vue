<script setup lang="ts">
  import { usePosts } from '../stores/posts';
  import TimelineItem from './TimelineItem.vue';
  import { periods, Period } from '../constants';

  const postsStore = usePosts();

  await postsStore.fetchPosts();
</script>
<template>
  <nav>
    <a
      v-for="(period, index) in periods"
      :class="{ 'is-active': postsStore.selectedPeriod === period }"
      @click="postsStore.setSelectedPeriod(period)"
      :key="index"
      >{{ period }}</a
    >
  </nav>

  <TimelineItem
    v-for="post of postsStore.posts"
    :post="post"
    :key="post.id" />
</template>

<style lang="scss" scoped>
  nav {
    a {
      padding: 20px;
      text-decoration: underline;
      cursor: pointer;
      &.is-active {
        color: red;
      }
    }
  }
</style>
