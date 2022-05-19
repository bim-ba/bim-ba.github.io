<template>
  <AppBackground ref="background" :size="1.5" />
  <AppContent ref="content" />
  <AppFooter ref="footer" />
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
    content: ComponentPublicInstance & {
      $refs: {
        firstname: HTMLElement;
        lastname: HTMLElement;
        description: HTMLElement;
      };
    };
    footer: ComponentPublicInstance & {
      $refs: {
        coordinates: ComponentPublicInstance;
        icon: ComponentPublicInstance;
      };
    };
    background: ComponentPublicInstance & {
      $refs: {
        squares: ComponentPublicInstance[];
      };
    };
  };
}

const content = ref<Pick<ThisComponentPublicInstance["$refs"]["content"], "$refs"> | null>(null);
const footer = ref<Pick<ThisComponentPublicInstance["$refs"]["footer"], "$refs"> | null>(null);
const background = ref<Pick<ThisComponentPublicInstance["$refs"]["background"], "$refs"> | null>(
  null
);

// HOOKS
onMounted(() => {
  timeline
    .add({ targets: content.value?.$refs.firstname, ...slideFromLeftAnimation })
    .add({ targets: content.value?.$refs.lastname, ...slideFromRightAnimation }, "-=1000")
    .add({ targets: content.value?.$refs.description, ...riseFromBottomAnimation }, "-=1000")
    .add({ targets: footer.value?.$refs.coordinates.$el, ...riseFromBottomAnimation }, "-=1000")
    .add({ targets: footer.value?.$refs.icon.$el, ...bubbleJellyAnimation }, "-=1000")
    .add(
      {
        targets: background.value?.$refs.squares.map(({ $refs }) => $refs.square),
        delay: anime.stagger(100),
        scaleY: [0, 1],
        translateX: ["2500%", 0],
      },
      "-=500"
    );
});
</script>
