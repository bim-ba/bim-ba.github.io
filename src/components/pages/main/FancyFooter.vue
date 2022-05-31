<template>
  <footer class="wrapper">
    <!-- empty space -->
    <div></div>
    <FooterCoordinates ref="coordinatesRef" />
    <NavigationIcon ref="iconRef" :size="3" to="/projects" class="icon" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { Nullable } from "@/types/helpers";

import NavigationIcon from "@components/NavigationIcon.vue";
import FooterCoordinates from "@pages/main/FooterCoordinates.vue";

// template refs
const coordinatesRef = ref<Nullable<InstanceType<typeof FooterCoordinates>>>(null);
const iconRef = ref<Nullable<InstanceType<typeof NavigationIcon>>>(null);

// exposed
defineExpose({ coordinatesRef, iconRef });
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;

  position: fixed;
  width: 100%;
  bottom: 1em;
  .icon {
    margin-right: 2.5em;
  }
  .contacts {
    margin-left: 5em;
    font-weight: 500;
    align-self: center;

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
