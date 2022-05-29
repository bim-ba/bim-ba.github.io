<template>
  <MainBackground ref="backgroundRef" :size="1.5" />
  <MainContent ref="contentRef" />
  <MainFooter ref="footerRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import anime from "animejs";
import {
  slideFromLeftAnimation,
  slideFromRightAnimation,
  riseFromBottomAnimation,
  bubbleJellyAnimation,
} from "@common/animations";

import MainContent from "@pages/main/FullName.vue";
import MainFooter from "@pages/main/AppFooter.vue";
import MainBackground from "@pages/main/BackgroundSquares.vue";

// template refs
const footerRef = ref<InstanceType<typeof MainFooter> | null>(null);
const contentRef = ref<InstanceType<typeof MainContent> | null>(null);
const backgroundRef = ref<InstanceType<typeof MainBackground> | null>(null);

// data
const timeline = anime.timeline({ delay: 500 });

// hooks
onMounted(() => {
  timeline
    .add({ targets: contentRef.value?.firstnameRef, ...slideFromLeftAnimation })
    .add({ targets: contentRef.value?.lastnameRef, ...slideFromRightAnimation }, 0)
    .add({ targets: contentRef.value?.descriptionRef, ...riseFromBottomAnimation }, "-=1000")
    .add({ targets: footerRef.value?.coordinatesRef?.$el, ...riseFromBottomAnimation }, "-=1000")
    .add({ targets: footerRef.value?.iconRef?.$el, ...bubbleJellyAnimation }, "-=1000")
    .add(
      {
        targets: backgroundRef.value?.squaresRef?.map(({ squareRef }) => squareRef),
        delay: anime.stagger(100),
        scaleY: [0, 1],
        translateX: ["2500%", 0],
      },
      "-=2000"
    );
});
</script>

<style lang="scss">
.main-footer {
  display: flex;
  justify-content: space-between;

  position: fixed;
  width: 100%;
  bottom: 1em;
  .icon {
    margin-right: 2.5em;
  }
}
</style>
