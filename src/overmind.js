import { Overmind } from "overmind";
import { createHook } from "overmind-react";

const overmind = new Overmind({
  state: {
    isLoadingPosts: true,
    showCount: "10",
    posts: [],
    filteredPosts: state => state.posts.slice(0, state.showCount)
  },
  actions: {
    getPosts: async ({ state, effects }) => {
      state.isLoadingPosts = true;
      state.posts = await effects.request(
        "https://jsonplaceholder.typicode.com/posts"
      );
      state.isLoadingPosts = false;
    },
    changeShowCount: ({ state, effects }, event) => {
      state.showCount = event.target.value;
      effects.bip();
    }
  },
  effects: {
    request: async url => {
      const response = await fetch(url);
      return response.json();
    },
    bip() {
      const context = new AudioContext();
      const o = context.createOscillator();
      const g = context.createGain();
      g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1);
      o.connect(g);
      g.connect(context.destination);
      o.start(0);
    }
  }
});

export const useOvermind = createHook(overmind);
