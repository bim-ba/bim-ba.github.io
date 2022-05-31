<template>
  <!-- TODO: slots -->
  <Content ref="contentRef" />
  <FancyFooter ref="footerRef" />
  <Background ref="backgroundRef" />
  <!-- 
    <Content>
      <template #firstname>{{ firstname }}</template>
      <template #lastname>{{ lastname }}</template>
      <template #description>{{ description }}</template>
    </Content>
   -->
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
import { useTimeline } from "@common/composables";
import type { Nullable } from "@/types/helpers";

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
