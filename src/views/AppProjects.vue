<template>
  <div class="grid-wrapper">
    <FloppyCarousel ref="carouselRef" style="grid-area: floppy" />
    <NavigationIcon ref="iconRef" reversed :size="3" to="/" style="margin-left: 2em" />
    <FooterSquares ref="squaresRef" :size="0.6" style="grid-area: footer" />
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
    carouselRef: ComponentPublicInstance & {
      $refs: {
        floppiesRef: ComponentPublicInstance[];
      };
    };
    footerRef: ComponentPublicInstance & {
      $refs: {
        squaresRef: ComponentPublicInstance[];
      };
    };
  };
}

// eslint-disable-next-line prettier/prettier
const iconRef = ref<ComponentPublicInstance | null>(
  null
);
const carouselRef = ref<Pick<ThisComponentPublicInstance["$refs"]["carouselRef"], "$refs"> | null>(
  null
);
const squaresRef = ref<Pick<ThisComponentPublicInstance["$refs"]["footerRef"], "$refs"> | null>(
  null
);

// HOOKS
onMounted(() => {
  timeline
    .add({
      targets: carouselRef.value?.$refs.floppiesRef.map(({ $refs }) => $refs.floppyRef),
      delay: anime.stagger(500, { start: 500 }),
      ...bubbleJellyAnimation,
    })
    .add({ targets: iconRef.value?.$el, ...bubbleJellyAnimation }, "-=500")
    .add(
      {
        targets: squaresRef.value?.$refs.squaresRef.map(({ $refs }) => $refs.squareRef),
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
