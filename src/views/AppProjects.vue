<template>
  <ProjectsCarousel ref="carouselRef" />
  <ProjectsFooter ref="footerRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import anime from "animejs";

import { useTimeline } from "@common/composables";
import { bubbleAnimation, bubbleJellyAnimation } from "@common/animations";
import type { Nullable } from "@/types/helpers";

import ProjectsCarousel from "@pages/projects/FloppyCarousel.vue";
import ProjectsFooter from "@pages/projects/ProjectsFooter.vue";

// template refs
const carouselRef = ref<Nullable<InstanceType<typeof ProjectsCarousel>>>(null);
const footerRef = ref<Nullable<InstanceType<typeof ProjectsFooter>>>(null);

// reactive
const { timeline } = useTimeline();

// hooks
onMounted(() => {
  const onlyCenteredFloppies = carouselRef.value?.floppiesRef
    ?.map(({ floppyRef }) => floppyRef)
    .slice(
      carouselRef.value.floppiesRef.length / 2 - 1,
      carouselRef.value.floppiesRef.length / 2 + 2
    );

  timeline
    .add({
      targets: onlyCenteredFloppies,
      delay: anime.stagger(500, { start: 500, from: "center" }),
      ...bubbleJellyAnimation,
    })
    .add({ targets: footerRef.value?.backwardIconRef?.$el, ...bubbleJellyAnimation }, "-=500")
    .add({ targets: footerRef.value?.forwardIconRef?.$el, ...bubbleJellyAnimation }, "-=500")
    .add(
      {
        targets: footerRef.value?.squaresRef?.squaresRef?.map(({ squareRef }) => squareRef),
        delay: anime.stagger(100, { start: 500 }),
        ...bubbleAnimation,
      },
      0
    );
});
</script>
