<template>
  <div class="wrapper">
    <ColoredSquare
      v-for="(square, index) in footerSquares"
      ref="squaresRef"
      :key="index"
      :size="props.size"
      :color="square.color"
      :offset="square.offset"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { squaresKey } from "@injection-keys";
import type { Square } from "@types";

import ColoredSquare from "@components/ColoredSquare.vue";

// PROPS
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...;
interface ThisProps {
  size: number;
}
const props = defineProps<ThisProps>();

// INJECT
const { footerSquares } = inject(squaresKey) as {
  backgroundSquares: Square[];
  footerSquares: Square[];
};
</script>

<style lang="scss" scoped>
$square-size: v-bind('props.size + "em"');
.wrapper {
  display: flex;
  place-self: center;
  .square {
    width: $square-size;
    height: $square-size;

    flex-shrink: 0;
  }
}
</style>
