<template>
  <section class="background-squares-container">
    <ColoredSquare
      v-for="({ color, offset, size, breakLinesAfter, breakLinesBefore }, index) in squares"
      ref="squaresRef"
      :key="index"
      :size="size"
      :color="color"
      :offset="offset"
      :break-lines-before="breakLinesBefore"
      :break-lines-after="breakLinesAfter"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

import { mainPageKey, type MainPageKeyType } from "@injection-keys";
import type { Nullable } from "@/types/helpers";

import ColoredSquare from "@components/ColoredSquare.vue";

// injected
const { squares } = inject(mainPageKey) as NonNullable<MainPageKeyType>;

// template refs
const squaresRef = ref<Nullable<Array<InstanceType<typeof ColoredSquare>>>>(null);

// exposed
defineExpose({ squaresRef });
</script>

<style lang="scss" scoped>
.background-squares-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  transform: rotate(-45deg);
}
</style>
