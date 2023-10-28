<template>
  <div class="wrapper">
    <ColoredSquare
      v-for="({ color, size, offset }, index) in squares"
      ref="squaresRef"
      :key="index"
      :size="size"
      :color="color"
      :offset="offset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

import type { Nullable } from "@antfu/utils";

import { projectsPageKey, type ProjectsPageKey } from "@injection-keys";

import ColoredSquare from "@components/ColoredSquare.vue";

// inject
const { squares } = inject(projectsPageKey) as NonNullable<ProjectsPageKey>;

// template refs
const squaresRef = ref<Nullable<Array<InstanceType<typeof ColoredSquare>>>>(null);

// exposed
defineExpose({ squaresRef });
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  place-self: center;
}
</style>
