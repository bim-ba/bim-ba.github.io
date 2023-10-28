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
import type { Nullable } from "@antfu/utils";

import NavigationIcon from "@components/NavigationIcon.vue";
import FooterCoordinates from "@pages/main/FooterCoordinates.vue";

// template refs
const coordinatesRef = ref<Nullable<InstanceType<typeof FooterCoordinates>>>(null);
const iconRef = ref<Nullable<InstanceType<typeof NavigationIcon>>>(null);

// exposed
defineExpose({ coordinatesRef, iconRef });
</script>

<style lang="scss" scoped>
$navigation-icon-margin-left: 2.5em;
.wrapper {
  display: flex;
  justify-content: space-between;

  position: fixed;
  width: 100%;
  bottom: 1em;

  .icon {
    margin-right: $navigation-icon-margin-left;
  }
}
</style>
