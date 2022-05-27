<template>
  <section class="background-squares">
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
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

import { squaresKey, type SquaresKeyType } from "@injection-keys";

import ColoredSquare from "@components/ColoredSquare.vue";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  size: number;
}
const props = withDefaults(defineProps<ThisProps>(), { size: 1 });

// injected
const { backgroundSquares } = inject(squaresKey) as NonNullable<SquaresKeyType>;

// template refs
const squaresRef = ref<Array<InstanceType<typeof ColoredSquare>> | null>(null);

// exposed
defineExpose({ squaresRef });
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
