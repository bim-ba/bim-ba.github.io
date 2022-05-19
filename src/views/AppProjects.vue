<template>
  <div class="grid-wrapper">
    <FloppyCarousel ref="carousel" style="grid-area: floppy" />
    <NavigationIcon ref="icon" reversed :size="3" to="/" style="margin-left: 2em" />
    <FooterSquares ref="squares" :size="0.6" style="grid-area: footer" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ComponentPublicInstance } from "vue";

import anime from "animejs";
import { bubbleAnimation, bubbleJellyAnimation } from "@common/animations";

import NavigationIcon from "@components/NavigationIcon.vue";
import FooterSquares from "@pages/projects/FooterSquares.vue";
import FloppyCarousel from "@pages/projects/FloppyCarousel.vue";

// DATA
const timeline = anime.timeline();

// REFS
interface ThisComponentPublicInstance extends ComponentPublicInstance {
  $refs: {
    carousel: ComponentPublicInstance & {
      $refs: {
        floppies: ComponentPublicInstance[];
      };
    };
    footer: ComponentPublicInstance & {
      $refs: {
        squares: ComponentPublicInstance[];
      };
    };
  };
}

const icon = ref<ComponentPublicInstance | null>(null);
const carousel = ref<Pick<ThisComponentPublicInstance["$refs"]["carousel"], "$refs"> | null>(null);
const squares = ref<Pick<ThisComponentPublicInstance["$refs"]["footer"], "$refs"> | null>(null);

// HOOKS
onMounted(() => {
  timeline
    .add({
      targets: carousel.value?.$refs.floppies.map(({ $refs }) => $refs.floppy),
      delay: anime.stagger(500, { start: 500 }),
      ...bubbleJellyAnimation,
    })
    .add({ targets: icon.value?.$el, ...bubbleJellyAnimation }, "-=500")
    .add(
      {
        targets: squares.value?.$refs.squares.map(({ $refs }) => $refs.square),
        delay: anime.stagger(100, { start: 500 }),
        ...bubbleAnimation,
      },
      0
    );
});
</script>

<style lang="scss" scoped>
.grid-wrapper {
  display: grid;
  grid-template-areas:
    "floppy floppy floppy"
    "icon   ...... ....."
    "footer footer footer";
  grid-template-rows: auto 10% 10%;

  height: 100%;
}
</style>
