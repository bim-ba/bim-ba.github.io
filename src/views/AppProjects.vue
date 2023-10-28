<template>
  <ProjectsCarousel ref="carouselRef" />
  <ProjectsFooter ref="footerRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import anime from "animejs";

import { useTimeline } from "@common/composables";
import { bubbleAnimation, bubbleJellyAnimation, clearCSSProperties } from "@common/animations";
import type { Nullable } from "@antfu/utils";

import { DoublyLinkedList } from "@common/data-structures";

import ProjectsCarousel from "@pages/projects/FloppyCarousel.vue";
import ProjectsFooter from "@pages/projects/ProjectsFooter.vue";

// template refs
const footerRef = ref<Nullable<InstanceType<typeof ProjectsFooter>>>(null);
const carouselRef = ref<Nullable<InstanceType<typeof ProjectsCarousel>>>(null);
const floppiesRef = ref(carouselRef.value?.floppiesRef);

// reactive
const { timeline } = useTimeline();

// hooks
onMounted(() => {
  floppiesRef.value = carouselRef.value?.floppiesRef;
  for (const floppyRef of floppiesRef.value!) floppyRef.isAnimated = false;

  /**
   * ```
   *    viewport
   * --------------
   * |            |
   * |  -1  0  1  |
   * |            |
   * --------------
   * ```
   * numbers are floppy indexes
   * we need last one (-1), first (0) and second (1) floppy disks
   * it is for better animation using timeline from anime.js
   */
  const linkedList = new DoublyLinkedList(floppiesRef.value!);
  const primaryFloppyRef = linkedList.find((floppyRef) => floppyRef.$props.isPrimary === true);

  const viewableFloppiesRefs = [
    primaryFloppyRef!.prev!.data,
    primaryFloppyRef!.data,
    primaryFloppyRef!.next!.data,
  ];
  const timelineElementsFloppies = viewableFloppiesRefs.map(({ floppyRef }) => floppyRef!);

  const [forwardIconRef, backwardIconRef] = [
    footerRef.value!.forwardIconRef!,
    footerRef.value!.backwardIconRef!,
  ];

  const timelineElementsSquares = footerRef.value!.squaresRef!.squaresRef!.map(
    ({ squareRef }) => squareRef!
  );
  const timelineDelay = anime.stagger(500, { start: 500, from: "center" });

  timeline
    .add({
      begin: () => {
        for (const floppyRef of viewableFloppiesRefs) floppyRef!.isAnimated = true;
      },

      targets: timelineElementsFloppies,
      delay: timelineDelay,
      ...bubbleJellyAnimation,

      complete: () => {
        for (const floppyRef of viewableFloppiesRefs) {
          clearCSSProperties(floppyRef.floppyRef!, ["transform"]);
          floppyRef.isAnimated = false;
        }
      },
    })
    .add(
      {
        begin: () => (backwardIconRef!.isAnimated = true),

        targets: backwardIconRef.$el,
        ...bubbleJellyAnimation,

        complete: () => (backwardIconRef!.isAnimated = false),
      },
      "-=500"
    )
    .add(
      {
        begin: () => (forwardIconRef!.isAnimated = true),

        targets: forwardIconRef.$el,
        ...bubbleJellyAnimation,

        complete: () => (forwardIconRef!.isAnimated = false),
      },
      "-=500"
    )
    .add(
      {
        begin: () => {
          for (const squareRef of footerRef.value!.squaresRef!.squaresRef!)
            squareRef.isAnimated = true;
        },

        targets: timelineElementsSquares,
        delay: anime.stagger(100, { start: 500 }),
        ...bubbleAnimation,

        complete: () => {
          for (const squareRef of footerRef.value!.squaresRef!.squaresRef!) {
            clearCSSProperties(squareRef.squareRef, ["transform"]);
            squareRef.isAnimated = false;
          }
        },
      },
      0
    );
});
</script>
