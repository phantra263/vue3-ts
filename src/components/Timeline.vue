<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { DateTime } from 'luxon';
  import { Post, today, thisWeek, thisMonth, TimelinePost } from '../posts';
  import { usePosts } from '../stores/posts';
  import TimelineItem from './TimelineItem.vue';
  import { periods, Period } from '../constants';

  const postsStore = usePosts();

  let selectedPeriod = ref<Period>('Today');

  function selectPeriod(period: Period) {
    selectedPeriod.value = period;
  }

  const posts = computed<TimelinePost[]>(() => {
    return postsStore.ids
      .map((id: any) => {
        const post = postsStore.all.get(id);

        if (!post) {
          throw Error(`Post with id of ${id} was expected but not found`);
        }
        return {
          ...post,
          created: DateTime.fromISO(post.created),
        };
      })
      .filter((post: any) => {
        if (selectedPeriod.value === 'Today') {
          return post.created >= DateTime.now().minus({ day: 1 });
        }

        if (selectedPeriod.value === 'This week') {
          return post.created >= DateTime.now().minus({ week: 1 });
        }

        if (selectedPeriod.value === 'This month') {
          return post.created >= DateTime.now().minus({ month: 1 });
        }
      });
  });
</script>
<template>
  <nav>
    <a
      v-for="(period, index) in periods"
      :class="{ 'is-active': selectedPeriod === period }"
      @click="selectPeriod(period)"
      :key="index"
      >{{ period }}</a
    >
  </nav>

  <TimelineItem
    v-for="post of posts"
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
