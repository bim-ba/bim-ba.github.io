<template>
  <div class="vertical-line-wrapper">
    <div ref="lineRef" class="vertical-line"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { Nullable } from "@/types/helpers";

// template refs
const lineRef = ref<Nullable<HTMLElement>>(null);

// exposed
defineExpose({ lineRef });
</script>

<style lang="scss">
.vertical-line-wrapper {
  grid-area: some;

  display: flex;
  justify-content: center;
  .vertical-line {
    width: 0.075em;
    height: 100vh;

    background: #ccc;
  }
}
</style>
