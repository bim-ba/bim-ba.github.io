<template>
  <div v-for="n in props.breakLinesBefore" :key="n" class="break"></div>
  <div v-if="props.offset" class="space"></div>
  <div ref="squareRef" v-on-drag="drag" class="square"></div>
  <div v-for="n in props.breakLinesAfter" :key="n" class="break"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useSpring, useMotionProperties } from "@vueuse/motion";
import type { MotionProperties, PermissiveMotionProperties } from "@vueuse/motion";

import { useDrag, dragDirective as vOnDrag } from "@vueuse/gesture";
import type { FullGestureState } from "@vueuse/gesture";

// props
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

// template refs
const squareRef = ref<HTMLElement | null>(null);

// reactive
const isDragging = ref(false);

// dragging
const initalProps: MotionProperties = {
  x: 0,
  y: 0,
  cursor: "grab",
  filter: "invert(0%)",
};
const { motionProperties } = useMotionProperties(squareRef, initalProps);
const { set } = useSpring(motionProperties as PermissiveMotionProperties, { stiffness: 500 });

// FIXME: get rid of `scaleY`
const drag = ({ dragging, movement: [x, y] }: FullGestureState<"drag">) => {
  isDragging.value = dragging;

  if (!dragging) {
    set({ scale: 1, ...initalProps });
    return;
  }

  set({
    cursor: "grabbing",
    x,
    y,
    scale: 1.5,
    scaleY: 1,
    filter: "invert(100%)",
  });
};
useDrag(drag, { domTarget: squareRef });

// exposed
defineExpose({ isDragging, squareRef });
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
