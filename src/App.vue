<!-- TODO: fix scaleY problem -->

<template>
  <router-view v-slot="{ Component, route }">
    <Head>
      <title>{{ route.meta.title }}</title>
    </Head>
    <transition :name="route.meta.transition">
      <div v-if="orientation?.startsWith('portrait')" class="alert-container">
        <h1>ROTATE YOUR DEVICE</h1>
      </div>
      <div v-else :key="route.path" class="route-container">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Head } from "@vueuse/head";
import { useScreenOrientation } from "@vueuse/core";

import { useAnySquareStore } from "@/stores/appmain";
import type { Nullable } from "@/types/utils";

// template ref
const bodyRef = ref<Nullable<HTMLElement>>(null);

// store
const store = useAnySquareStore();

// reactive
const { orientation } = useScreenOrientation();

// square dragging
store.$subscribe((_, { dragging, color }) => {
  dragging
    ? bodyRef.value?.style.setProperty("background-color", color)
    : bodyRef.value?.style.removeProperty("background-color");
});

// hooks (dom ready)
onMounted(() => (bodyRef.value = document.body));
</script>

<style scoped lang="scss">
.route-container {
  height: 100%;
}
.alert-container {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  background: #c61c1d;

  h1 {
    color: white;
  }
}
</style>

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
#app {
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

.scale-bottom-right-enter-active {
  transform-origin: bottom left;
}
.scale-bottom-right-leave-active {
  transform-origin: bottom right;
}

.scale-bottom-left-enter-active {
  transform-origin: bottom right;
}
.scale-bottom-left-leave-active {
  transform-origin: bottom left;
}

.scale-center-enter-active,
.scale-center-leave-active {
  transform-origin: center;
}

// global classes

$fut-color: var(--fancy-underlined-text-color, black);
$fut-underline-color: var(--fancy-underlined-text-underline-color, black);
$fut-underline-size: var(--fancy-underlined-text-underline-size, 0.1em);
$fut-hover-color: var(--fancy-underlined-text-hover-color, white);
$fut-hover-background: var(--fancy-underlined-text-hover-background, black);
$fut-hover-selection-color: var(--fancy-underlined-text-hover-selection-color, black);
$fut-hover-selection-background: var(--fancy-underlined-text-selection-background, white);

.fancy-underlined-text {
  color: $fut-color;
  text-decoration: underline solid $fut-underline-color $fut-underline-size;

  position: relative;

  transition: color 0.25s ease-out;

  &:hover {
    color: $fut-hover-color;
    text-decoration: none;

    &::selection {
      color: $fut-hover-selection-color;
      background: $fut-hover-selection-background;
    }

    &::after {
      transform: scaleY(1);
      transform-origin: bottom;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: scaleY(0);
    transform-origin: top;
    background: $fut-hover-background;
    z-index: -1;

    transition: transform 0.25s ease-out;
  }
}

$fbt-color: var(--fancy-backgrounded-text-color, white);
$fbt-background: var(--fancy-backgrounded-text-background, black);
$fbt-selection-color: var(--fancy-backgrounded-text-selection-color, black);
$fbt-selection-background: var(--fancy-backgrounded-text-selection-background, white);

.fancy-backgrounded-text {
  color: $fbt-color;
  background: $fbt-background;

  &::selection {
    color: $fbt-selection-color;
    background: $fbt-selection-background;
  }
}

$dpbl-image-outline-width: 0.5em;
$dpbl-image-outline-offset: calc($dpbl-image-outline-width / 2 * -1);
$dpbl-image-outline-color: royalblue;

.droppable-image {
  outline: $dpbl-image-outline-width dotted;
  outline-offset: $dpbl-image-outline-offset;
  transition: outline-color 0.5s ease;

  &.active {
    outline-color: $dpbl-image-outline-color;
  }
  &.inactive {
    outline-color: transparent;
  }
}
</style>
