<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { DateTime } from 'luxon'
  import { Post, today, thisWeek, thisMonth } from '../posts'

  const periods = ['Today', 'This week', 'This month'] as const
  type Period = typeof periods[number]

  let selectedPeriod = ref<Period>('Today')

  function selectPeriod (period: Period) {
    selectedPeriod.value = period
  }

  const posts = computed(() => {
   return [today,thisWeek,thisMonth]
          .map(post => {
            return {
              ...post,
              created: DateTime.fromISO(post.created)
            }
          }).filter(post => {
            if (selectedPeriod.value === 'Today') {
              return post.created >= DateTime.now().minus({ day: 1 })
            }

            if (selectedPeriod.value === 'This week') {
              return post.created >= DateTime.now().minus({ week: 1 })
            }

            if (selectedPeriod.value === 'This month') {
              return post.created >= DateTime.now().minus({ month: 1 })
            }
          }) 
        })
</script>
<template>
  {{ selectedPeriod }}
  <nav>
    <a v-for="(period, index) in periods" 
        :class="{ 'is-active': selectedPeriod === period }"
        @click="selectPeriod(period)"
        :key="index">{{ period }}</a>
  </nav>

  <div>
    <p v-for="post in posts"
      :key="post.id">
      <a>{{ post.title }}</a>
      <span>{{ post.created.toFormat('d MMM') }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
nav {
  a {
    padding: 20px;
    text-decoration: underline;
    cursor: pointer;
    &.is-active {
      color: red
    }
  }
}
</style>