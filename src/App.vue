<template>
  <router-view v-slot="{ Component, route }">
    <Head>
      <title>{{ route.meta.title }}</title>
    </Head>
    <transition :name="route.meta.transition">
      <div :key="route.path" class="route-container">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Head } from "@vueuse/head";

import { useAnySquareStore } from "@/stores/appmain";
import type { Nullable } from "@/types/helpers";

// template ref
const bodyRef = ref<Nullable<HTMLElement>>(null);

// store
const store = useAnySquareStore();

// square dragging
store.$subscribe((_, { dragging, color }) => {
  dragging
    ? bodyRef.value?.style.setProperty("background-color", color)
    : bodyRef.value?.style.removeProperty("background-color");
});

// hooks (dom ready)
onMounted(() => (bodyRef.value = document.body));
</script>

<style lang="scss">
@use "@style/reset";

@use "@assets/fonts/Fira-Sans/stylesheet" as Fira-Sans;
@use "@assets/fonts/Indie-Flower/stylesheet" as Indie-Flower;

*::selection {
  color: white;
  background: black;
}

html,
body,
#app,
.route-container {
  height: 100%;
}

#app {
  font: calc(1vw + 1vh) "Fira Sans", sans-serif;
  overflow: hidden;
  position: relative;
}

body {
  // dotted background (1 dot = 1 radial-gradient)
  background-image: radial-gradient(#ccc 5%, transparent 5%);
  background-color: rgb(235 235 230);
  background-size: 2.75em 2.75em;

  transition: background-color 1s ease-out; // when dragging
}

// page transitions
.scale-bottom-right-enter-active,
.scale-bottom-right-leave-active,
.scale-bottom-left-enter-active,
.scale-bottom-left-leave-active,
.scale-center-enter-active,
.scale-center-leave-active {
  transition: transform 0.25s;
}

.scale-bottom-right-enter-from,
.scale-bottom-right-leave-to,
.scale-bottom-left-enter-from,
.scale-bottom-left-leave-to,
.scale-center-enter-from,
.scale-center-leave-to {
  transform: scale(0);
}

.scale-bottom-right-enter-active,
.scale-bottom-right-leave-active {
  transform-origin: bottom left;
}

.scale-bottom-left-enter-active,
.scale-bottom-left-leave-active {
  transform-origin: bottom right;
}

.scale-center-enter-active,
.scale-center-leave-active {
  transform-origin: center;
}
</style>
