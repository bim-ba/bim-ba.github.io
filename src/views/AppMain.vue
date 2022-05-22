<template>
  <AppBackground ref="backgroundRef" :size="1.5" />
  <AppContent ref="contentRef" />
  <AppFooter ref="footerRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ComponentPublicInstance } from "vue";

import AppFooter from "@pages/main/AppFooter.vue";
import AppContent from "@pages/main/FullName.vue";
import AppBackground from "@pages/main/BackgroundSquares.vue";

import anime from "animejs";
import {
  slideFromLeftAnimation,
  slideFromRightAnimation,
  riseFromBottomAnimation,
  bubbleJellyAnimation,
} from "@common/animations";

// DATA
const timeline = anime.timeline({ delay: 500 });

// REFS
interface ThisComponentPublicInstance extends ComponentPublicInstance {
  $refs: {
    contentRef: ComponentPublicInstance & {
      $refs: {
        firstnameRef: HTMLElement;
        lastnameRef: HTMLElement;
        descriptionRef: HTMLElement;
      };
    };
    footerRef: ComponentPublicInstance & {
      $refs: {
        coordinatesRef: ComponentPublicInstance;
        iconRef: ComponentPublicInstance;
      };
    };
    backgroundRef: ComponentPublicInstance & {
      $refs: {
        squaresRef: ComponentPublicInstance[];
      };
    };
  };
}

const contentRef = ref<Pick<ThisComponentPublicInstance["$refs"]["contentRef"], "$refs"> | null>(
  null
);
const footerRef = ref<Pick<ThisComponentPublicInstance["$refs"]["footerRef"], "$refs"> | null>(
  null
);
// eslint-disable-next-line prettier/prettier
const backgroundRef = ref<Pick<ThisComponentPublicInstance["$refs"]["backgroundRef"], "$refs"> | null>(
  null
);

// HOOKS
onMounted(() => {
  timeline
    .add({ targets: contentRef.value?.$refs.firstnameRef, ...slideFromLeftAnimation })
    .add({ targets: contentRef.value?.$refs.lastnameRef, ...slideFromRightAnimation }, "-=1000")
    .add({ targets: contentRef.value?.$refs.descriptionRef, ...riseFromBottomAnimation }, "-=1000")
    .add({ targets: footerRef.value?.$refs.coordinatesRef.$el, ...riseFromBottomAnimation }, "-=1000") // eslint-disable-line prettier/prettier
    .add({ targets: footerRef.value?.$refs.iconRef.$el, ...bubbleJellyAnimation }, "-=1000")
    .add(
      {
        targets: backgroundRef.value?.$refs.squaresRef.map(({ $refs }) => $refs.squareRef),
        delay: anime.stagger(100),
        scaleY: [0, 1],
        translateX: ["2500%", 0],
      },
      "-=500"
    );
});
</script>
