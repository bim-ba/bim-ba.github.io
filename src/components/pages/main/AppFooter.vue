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

import NavigationIcon from "@components/NavigationIcon.vue";
import FooterCoordinates from "@pages/main/FooterCoordinates.vue";

// template refs
const coordinatesRef = ref<InstanceType<typeof FooterCoordinates> | null>(null);
const iconRef = ref<InstanceType<typeof NavigationIcon> | null>(null);

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
}
</style>
