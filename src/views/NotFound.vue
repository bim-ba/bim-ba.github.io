<template>
  <section class="icon-content-container">
    <div ref="iconRef" class="icon">
      <router-link to="/">
        <img ref="outerRef" src="/svg/outer.svg" alt="loadicon" class="outer" />
        <img ref="innerRef" src="/svg/inner.svg" alt="loadicon" class="inner" />
      </router-link>
    </div>
    <h1 ref="textRef" v-hover="hover" class="text">
      {{ revealErrorText ? errorData.details : errorData.code }}
    </h1>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import anime from "animejs";

import { computedWithControl } from "@vueuse/core";
import type { FullGestureState } from "@vueuse/gesture";
import type { MotionProperties } from "@vueuse/motion";

import _ from "lodash";

import type { Nullable } from "@antfu/utils";

import { useTimeline, useSpringAnimation, useInitialProps } from "@common/composables";
import { bubbleAnimation, clearCSSProperties } from "@common/animations";

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
const { timeline } = useTimeline({ duration: 750, delay: 250 });
const revealErrorText = ref(false);
const isTextAnimated = ref<boolean>();

// initial props
const initialProps = useInitialProps({ scale: 1 });

// spring-set function
const set = computedWithControl(
  () => isTextAnimated.value,
  () => {
    if (isTextAnimated.value === false) {
      const { set } = useSpringAnimation(textRef, initialProps, {
        stiffness: 500,
      });

      return set;
    }

    return (properties: MotionProperties) => _.noop(properties);
  }
);

// hovering
const hover = ({ hovering }: FullGestureState<"move">) => {
  revealErrorText.value = hovering;

  if (hovering) set.value({ scale: 1.1 });
  else set.value(initialProps);
};

// hooks
onMounted(() => {
  // center outer and inner in container because those absolutely positioned
  anime.set(outerRef.value!, { translateX: "-50%", translateY: "-50%" });
  anime.set(innerRef.value!, { translateX: "-50%", translateY: "-50%" });

  timeline
    .add({
      targets: iconRef.value,
      ...bubbleAnimation,

      // FIXME: `scale` property affects page
      complete: () => clearCSSProperties(iconRef.value!, ["transform"]),
    })
    .add({
      begin: () => (isTextAnimated.value = true),

      targets: textRef.value,
      ...bubbleAnimation,

      complete: () => {
        clearCSSProperties(textRef.value!, ["transform"]);
        isTextAnimated.value = false;
      },
    })
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
