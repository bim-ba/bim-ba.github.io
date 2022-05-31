<template>
  <section class="icon-content-container">
    <div ref="iconRef" class="icon">
      <router-link to="/">
        <img ref="outerRef" src="/svg/outer.svg" alt="loadicon" class="outer" />
        <img ref="innerRef" src="/svg/inner.svg" alt="loadicon" class="inner" />
      </router-link>
    </div>
    <h1 ref="textRef" v-on-hover="(state) => (revealError = state)" class="text">
      {{ revealError ? errorData.details : errorData.code }}
    </h1>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { vElementHover as vOnHover } from "@vueuse/components";

import { useMotionProperties, useSpring } from "@vueuse/motion";
import type { MotionProperties, PermissiveMotionProperties } from "@vueuse/motion";

import { useHover } from "@vueuse/gesture";
import type { FullGestureState } from "@vueuse/gesture";

import anime from "animejs";

import { useTimeline } from "@/common/composables";
import { bubbleAnimation } from "@common/animations";
import type { Nullable } from "@/types/helpers";

// template refs
const iconRef = ref<Nullable<HTMLElement>>(null);
const outerRef = ref<Nullable<HTMLElement>>(null);
const innerRef = ref<Nullable<HTMLElement>>(null);
const textRef = ref<Nullable<HTMLElement>>(null);

// shared
const errorData = {
  code: 404,
  details: "Not Found",
};

// reactive
const { timeline } = useTimeline({ duration: 750 });
const revealError = ref(false);

// hovering
const initialProps: MotionProperties = { scale: 1 };
const { motionProperties } = useMotionProperties(textRef, initialProps);
const { set } = useSpring(motionProperties as PermissiveMotionProperties, { stiffness: 300 });

const hover = ({ hovering }: FullGestureState<"move">) => {
  if (!hovering) {
    set(initialProps);
    return;
  }
  set({ scale: 1.15, scaleY: 1 });
};
useHover(hover, { domTarget: textRef });

// hooks
onMounted(() => {
  anime.set(outerRef.value, { translateX: "-50%", translateY: "-50%" });
  anime.set(innerRef.value, { translateX: "-50%", translateY: "-50%" });

  timeline
    .add({
      targets: iconRef.value,
      ...bubbleAnimation,
    })
    .add(
      {
        targets: textRef.value,
        ...bubbleAnimation,
      },
      0
    )
    .finished.then(() => {
      anime({
        targets: outerRef.value,
        rotate: [90, 180, 270, 360],
        duration: 8000,
        loop: true,
      });
      anime({
        targets: innerRef.value,
        rotate: [60, 120, 180, 240, 300, 360],
        duration: 6000,
        loop: true,
      });
    });
});
</script>

<style lang="scss" scoped>
$outer-icon-height: 10em;
$hovered-outer-icon-height: calc($outer-icon-height + 0.5em);

$inner-icon-height: calc($outer-icon-height / 1.5);
$hovered-inner-icon-height: calc($inner-icon-height + 0.5em);

$icon-container-size: calc($outer-icon-height * 1.5);

$text-font-weight: normal;
$text-font-size: calc($outer-icon-height / 7);
.icon-content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  overflow: hidden;
  .icon {
    height: $icon-container-size;
    .outer,
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      // transform: translate(-50%, -50%);
      transition: height 0.15s ease-out;
    }
    .outer {
      height: $outer-icon-height;

      &:hover {
        height: $hovered-outer-icon-height;
      }
    }
    .inner {
      height: $inner-icon-height;

      &:hover {
        height: $hovered-inner-icon-height;
      }
    }
  }

  .text {
    font-family: monospace;
    font-size: $text-font-size;
    font-weight: $text-font-weight;

    padding: 0.25em;

    transition: color 0.25s ease-out;

    &:hover {
      color: white;

      &::selection {
        color: black;
        background: white;
      }

      &::after {
        transform: scaleY(1);
        transform-origin: bottom;
      }
    }

    &::after {
      content: "";
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: black;
      transform: scaleY(0);
      transform-origin: top;

      transition: transform 0.25s ease-out;
    }
  }
}
</style>
