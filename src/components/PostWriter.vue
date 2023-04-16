<script setup lang="ts">
  import { onMounted, ref, watch, watchEffect } from 'vue';
  import { TimelinePost } from '../posts';
  import { marked } from 'marked';
  import highlightjs from 'highlight.js';
  import { usePosts } from '../stores/posts';
  import { useRouter } from 'vue-router';

  const posts = usePosts();
  const router = useRouter();

  const props = defineProps<{
    post: TimelinePost;
  }>();

  const title = ref(props.post.title);
  const content = ref(props.post.markdown);
  const html = ref('');
  const contentEdittable = ref<HTMLDivElement>();

  watchEffect(() => {
    marked.parse(
      content.value,
      {
        gfm: true,
        breaks: true,
        highlight: (code) => {
          return highlightjs.highlightAuto(code).value;
        },
      },
      (err, parseResult) => {
        html.value = parseResult;
      }
    );
  });

  onMounted(() => {
    if (!contentEdittable.value) {
      throw Error('Content not found');
    }
    contentEdittable.value.innerText = content.value;
  });

  function handleInput() {
    if (!contentEdittable.value) {
      throw Error('Content not found');
    }
    content.value = contentEdittable.value.innerText;
  }

  async function handleSubmit() {
    const newPost: TimelinePost = {
      ...props.post,
      title: title.value,
      markdown: content.value,
      html: html.value,
    };
    await posts.createPost(newPost);
    router.push('/');
  }
</script>
<template>
  <label for="title">Post title</label>
  <input
    type="text"
    id="title"
    v-model="title" />

  <div class="wrap-editer">
    <div
      class="edit-table table"
      @input="handleInput"
      contenteditable
      ref="contentEdittable">
      {{ content }}
    </div>

    <div
      class="content-table table"
      v-html="html"></div>
  </div>

  <button @click="handleSubmit">save post</button>
</template>

<style lang="scss" scoped>
  .wrap-editer {
    display: flex;
    align-items: flex-start;
    width: 100%;
    .table {
      width: 50%;
      border: 1px solid;
    }
  }
</style>
