<script setup lang="ts">
  import { DateTime } from 'luxon';
  import PostWriter from '../components/PostWriter.vue';
  import { TimelinePost } from '../posts';

  const post: TimelinePost = {
    id: '-1',
    title: 'title',
    created: DateTime.now(),
    markdown: '## title',
    html: '<h2>Title</h2>',
  };
</script>

<template>
  <RouterLink to="/">Back to home</RouterLink>

  <h2>New Post</h2>
  <PostWriter :post="post"></PostWriter>
</template>
