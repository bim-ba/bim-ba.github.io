<template>
  <footer class="projects-footer">
    <div class="icons-wrapper">
      <NavigationIcon ref="backwardIconRef" to="/" reversed :size="3" />
      <NavigationIcon ref="forwardIconRef" to="/about" :size="3" />
    </div>
    <FooterSquares ref="squaresRef" style="grid-area: footer" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { Nullable } from "@/types/utils";

import NavigationIcon from "@components/NavigationIcon.vue";
import FooterSquares from "@pages/projects/FooterSquares.vue";

// template refs
const backwardIconRef = ref<Nullable<InstanceType<typeof NavigationIcon>>>(null);
const forwardIconRef = ref<Nullable<InstanceType<typeof NavigationIcon>>>(null);
const squaresRef = ref<Nullable<InstanceType<typeof FooterSquares>>>(null);

// exposed
defineExpose({ backwardIconRef, forwardIconRef, squaresRef });
</script>

<style lang="scss" scoped>
.projects-footer {
  display: flex;
  flex-direction: column;
  gap: 1em;

  width: 100%;
  position: fixed;
  bottom: 3em;

  // content padding overlaps href
  z-index: 1;

  & > * {
    flex-grow: 1;
  }

  .icons-wrapper {
    display: flex;
    justify-content: space-between;

    margin: 0 2em;
  }
}
</style>
