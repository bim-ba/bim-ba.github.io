<template>
  <div v-for="n in props.breakLinesBefore" :key="n" class="break"></div>
  <div v-if="props.offset" class="space"></div>
  <div ref="squareRef" class="square"></div>
  <div v-for="n in props.breakLinesAfter" :key="n" class="break"></div>
</template>

<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";

// PROPS
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  color: string;
  size?: number;
  offset?: number;
  breakLinesBefore?: number;
  breakLinesAfter?: number;
}
const props = withDefaults(defineProps<ThisProps>(), {
  size: 1,
  offset: 0,
  breakLinesBefore: 0,
  breakLinesAfter: 0,
});

// refs
const squareRef = ref<ComponentPublicInstance | null>(null);
</script>

<style lang="scss" scoped>
$square-color: v-bind("props.color");
$square-size: v-bind('props.size + "em"');
$square-offset: v-bind('props.size * offset + "em"');

.square {
  width: $square-size;
  height: $square-size;
  background-color: $square-color;

  aspect-ratio: 1 / 1;
}
.break {
  flex-basis: 100%;
  height: 0;
}
.space {
  width: $square-offset;
  height: 0;
}
</style>
