<template>
  <footer class="projects-footer">
    <NavigationIcon
      ref="iconRef"
      reversed
      :size="3"
      to="/"
      style="margin-left: 2em; align-self: start"
    />
    <FooterSquares ref="squaresRef" :size="0.6" style="grid-area: footer" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NavigationIcon from "@components/NavigationIcon.vue";
import FooterSquares from "@pages/projects/FooterSquares.vue";

// template refs
const iconRef = ref<InstanceType<typeof NavigationIcon> | null>(null);
const squaresRef = ref<InstanceType<typeof FooterSquares> | null>(null);

// exposed
defineExpose({ iconRef, squaresRef });
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
}
</style>
