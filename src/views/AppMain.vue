<template>
  <Content ref="contentRef" />
  <FancyFooter ref="footerRef" />
  <Background ref="backgroundRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import anime from "animejs";

import {
  slideFromLeftAnimation,
  slideFromRightAnimation,
  riseFromBottomAnimation,
  bubbleAnimation,
  bubbleJellyAnimation,
  clearCSSProperties,
} from "@common/animations";
import { useTimeline } from "@common/composables";
import type { Nullable } from "@antfu/utils";

import Content from "@pages/main/FullName.vue";
import FancyFooter from "@pages/main/FancyFooter.vue";
import Background from "@pages/main/BackgroundSquares.vue";

// template refs
const footerRef = ref<Nullable<InstanceType<typeof FancyFooter>>>(null);
const contentRef = ref<Nullable<InstanceType<typeof Content>>>(null);
const backgroundRef = ref<Nullable<InstanceType<typeof Background>>>(null);

// reactive
const { timeline } = useTimeline({ delay: 500 });

// hooks
onMounted(() =>
  timeline
    .add({
      targets: contentRef.value!.firstnameRef,
      ...slideFromLeftAnimation,

      complete: () => clearCSSProperties(contentRef.value!.firstnameRef, ["transform"]),
    })
    .add(
      {
        targets: contentRef.value!.lastnameRef,
        ...slideFromRightAnimation,

        complete: () => clearCSSProperties(contentRef.value!.lastnameRef, ["transform"]),
      },
      0
    )
    .add(
      {
        targets: contentRef.value!.descriptionRef,
        ...riseFromBottomAnimation,

        complete: () => clearCSSProperties(contentRef.value!.descriptionRef, ["transform"]),
      },
      "-=1000"
    )
    .add(
      {
        begin: () => (footerRef.value!.coordinatesRef!.isAnimated = true),

        targets: footerRef.value!.coordinatesRef!.$el,
        ...riseFromBottomAnimation,

        complete: () => {
          footerRef.value!.coordinatesRef!.isAnimated = false;
          clearCSSProperties(footerRef.value!.coordinatesRef, ["transform"]);
        },
      },
      "-=1000"
    )
    .add(
      {
        begin: () => (footerRef.value!.iconRef!.isAnimated = true),

        targets: footerRef.value!.iconRef!.$el,
        ...bubbleJellyAnimation,

        complete: () => {
          footerRef.value!.iconRef!.isAnimated = false;
          clearCSSProperties(footerRef.value!.iconRef, ["transform"]);
        },
      },
      "-=1000"
    )
    .add(
      {
        begin: () => {
          for (const squareRef of backgroundRef.value!.squaresRef!) squareRef.isAnimated = true;
        },

        targets: backgroundRef.value!.squaresRef!.map(({ squareRef }) => squareRef),
        delay: anime.stagger(75),
        ...bubbleAnimation,
        translateX: ["2500%", 0],
        rotate: "1turn",
      },
      "-=2000"
    )
    .add({
      targets: backgroundRef.value!.squaresRef!.map(({ squareRef }) => squareRef),
      delay: anime.stagger(0),
      rotate: "1.5turn",

      complete: () => {
        for (const squareRef of backgroundRef.value!.squaresRef!) {
          clearCSSProperties(squareRef.squareRef!, ["transform"]);
          squareRef.isAnimated = false;
        }
      },
    })
);
</script>
