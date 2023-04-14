// stores/counter.js
import { defineStore } from "pinia";
import { Post, today, thisWeek, thisMonth } from "../posts";
import { periods, Period } from "../constants";
import { computed, reactive, toRefs, watchEffect } from "vue";
import { TimelinePost } from "../posts";
import { DateTime } from "luxon";

interface PostsState {
  ids: string[]; // ['1', '2']
  all: Map<string, Post>;
  selectedPeriod: Period;
}

// export const usePosts = defineStore("posts", {
//   state: (): PostsState => ({
//     ids: [today.id, thisWeek.id, thisMonth.id],
//     all: new Map([
//       [today.id, today],
//       [thisWeek.id, thisWeek],
//       [thisMonth.id, thisMonth],
//     ]),
//     selectedPeriod: "Today",
//   }),

//   actions: {
//     //
//     setSelectedPeriod(period: Period) {
//       this.selectedPeriod = period;
//     },
//   },

//   // getters: {
//   //   filteredPosts: (state): TimelinePost[] => {
//   //     return state.ids
//   //       .map((id: any) => {
//   //         const post = state.all.get(id);

//   //         if (!post) {
//   //           throw Error(`Post with id of ${id} was expected but not found`);
//   //         }
//   //         return {
//   //           ...post,
//   //           created: DateTime.fromISO(post.created),
//   //         };
//   //       })
//   //       .filter((post: any) => {
//   //         if (postsStore.selectedPeriod === 'Today') {
//   //           return post.created >= DateTime.now().minus({ day: 1 });
//   //         }

//   //         if (postsStore.selectedPeriod === 'This week') {
//   //           return post.created >= DateTime.now().minus({ week: 1 });
//   //         }

//   //         if (postsStore.selectedPeriod === 'This month') {
//   //           return post.created >= DateTime.now().minus({ month: 1 });
//   //         }
//   //       })
//   //   }
//   // }
// });

// function delay() {
//   return new Promise<void>((res) => setTimeout(res, 1500));
// }

export const usePosts = defineStore("post", () => {
  const postState = reactive<PostsState>({
    ids: [],
    all: new Map([]),
    selectedPeriod: "Today",
  });

  const setSelectedPeriod = (periods: Period) => {
    postState.selectedPeriod = periods;
  };

  const posts = computed<TimelinePost[]>(() => {
    return postState.ids
      .map((id) => {
        const post = postState.all.get(id);

        if (!post) {
          throw Error(`Post with id of ${id} was expected but not found`);
        }
        return {
          ...post,
          created: DateTime.fromISO(post.created),
        };
      })
      .filter((post) => {
        if (postState.selectedPeriod === "Today") {
          return post.created >= DateTime.now().minus({ day: 1 });
        }

        if (postState.selectedPeriod === "This week") {
          return post.created >= DateTime.now().minus({ week: 1 });
        }

        if (postState.selectedPeriod === "This month") {
          return post.created >= DateTime.now().minus({ month: 1 });
        }
      });
  });

  const fetchPosts = async () => {
    const res = await window.fetch("http://localhost:8000/");
    const data = (await res.json()) as Post[];
    // await delay();

    let ids: string[] = [];
    let all = new Map<string, Post>();
    for (const post of data) {
      ids.push(post.id);
      all.set(post.id, post);
    }

    postState.ids = ids;
    postState.all = all;
  };

  return {
    ...toRefs(postState),
    setSelectedPeriod,
    posts,
    fetchPosts,
  };
});
