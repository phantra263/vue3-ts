<script setup lang="ts">
  import { TimelinePost } from '../posts';
  defineProps<{
    post: TimelinePost;
  }>();
</script>
<template>
  <a>
    <span>{{ post.title }}</span>
    <span>{{ post.created.toFormat('d MMM') }}</span>
  </a>
</template>
<style lang="scss" scoped>
  a {
    display: block;
    text-align: left;
    padding: 10px;
    border: 1px solid;
    cursor: pointer;
    span {
      display: block;
      &:first-child {
        color: #000000;
      }
    }
  }
</style>
