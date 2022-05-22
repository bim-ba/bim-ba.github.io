<template>
  <div class="background-squares">
    <ColoredSquare
      v-for="(square, index) in backgroundSquares"
      ref="squaresRef"
      :key="index"
      :size="props.size"
      :color="square.color"
      :offset="square.offset"
      :break-lines-before="square.breakLinesBefore"
      :break-lines-after="square.breakLinesAfter"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { squaresKey } from "@injection-keys";
import type { Square } from "@types";

import ColoredSquare from "@components/ColoredSquare.vue";

// INJECT
const { backgroundSquares } = inject(squaresKey) as {
  backgroundSquares: Square[];
  footerSquares: Square[];
};

// PROPS
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  size: number;
}
const props = withDefaults(defineProps<ThisProps>(), { size: 1 });
</script>

<style lang="scss" scoped>
.background-squares {
  position: fixed;
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
