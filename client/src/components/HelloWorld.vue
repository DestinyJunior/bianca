<template>
  <div class="w-full flex flex-col items-center justify-between">
    <h1 class="text-4xl">{{ name }}</h1>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank"
        >Vite Documentation</a
      >
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <button
      class="bg-blue-500 text-white py-1 px-2 rounded"
      @click="state.count++"
    >
      count is: {{ state.count }}
    </button>
    <p class="text-blue-800">
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  name: String,
});

const state = reactive({ count: 0 });
</script>

<style scoped>
a {
  color: #42b983;
}
</style>