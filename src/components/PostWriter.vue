<script setup lang="ts">
import { ref } from 'vue'
import { TimelinePost } from '../posts';

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
</script>
<template>
  <div>
    <label for="title">Post title</label>
    <input type="text" 
            id="title"
            v-model="title">
            {{ title }}
  </div>
</template>