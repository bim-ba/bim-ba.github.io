<template>
  <div class="icon-content-container">
    <div ref="iconRef" class="icon">
      <router-link to="/">
        <img ref="outerRef" src="/svg/outer.svg" alt="loadicon" class="outer" />
        <img ref="innerRef" src="/svg/inner.svg" alt="loadicon" class="inner" />
      </router-link>
    </div>
    <h1
      ref="textRef"
      class="text"
      @mouseover="error = errorData.details"
      @mouseout="error = errorData.code"
    >
      {{ error }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import anime from "animejs";
import { bubbleAnimation } from "@common/animations";

// DATA
const errorData = {
  code: 404,
  details: "Not Found",
};
const timeline = anime.timeline({ duration: 750 });

// REACTIVE
const error = ref<string | number>(errorData.code);

// REFS
const iconRef = ref<HTMLElement | null>(null);
const outerRef = ref<HTMLElement | null>(null);
const innerRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

// HOOKS
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
    );

  timeline.finished.then(() => {
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
$hovered-text-font-weight: bold;
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

    transition: 0.25s ease-out;

    &:hover {
      font-weight: $hovered-text-font-weight;
      color: white;
      background: black;

      &::selection {
        color: black;
        background: white;
      }
    }
  }
}
</style>
