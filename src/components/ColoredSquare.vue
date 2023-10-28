<template>
  <div v-for="n in props.breakLinesBefore" :key="n" class="break"></div>
  <div v-if="props.offset" class="space"></div>
  <div ref="squareRef" v-drag="drag" v-hover="hover" class="square"></div>
  <div v-for="n in props.breakLinesAfter" :key="n" class="break"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { computedWithControl } from "@vueuse/core";
import type { FullGestureState } from "@vueuse/gesture";
import type { MotionProperties } from "@vueuse/motion";

import _ from "lodash";

import type { Nullable } from "@antfu/utils";

import { useInitialProps, useSpringAnimation } from "@common/composables";

/** props
 * @prop color: `string` - square color (any css color)
 * @prop size: `number` - square size (em`s)
 * @prop offset: `number?` - square offset after left square
 * @prop breakLinesBefore: `number?` - how much lines should we break before colored squares container
 * @prop breakLinesAfter: `number?` - how much lines should we break after colored squares container
 */
const props = withDefaults(
  defineProps<{
    color: string;
    size: number;
    offset?: number;
    breakLinesBefore?: number;
    breakLinesAfter?: number;
  }>(),
  {
    size: 1,
    offset: 0,
    breakLinesBefore: 0,
    breakLinesAfter: 0,
  }
);

// template refs
const squareRef = ref<Nullable<HTMLElement>>(null);

// reactive
const isAnimated = ref<boolean>();

// initial props
const initialProps = useInitialProps({
  x: 0,
  y: 0,
  scale: 1,
  cursor: "grab",
});

// spring-set function
const set = computedWithControl(
  () => isAnimated.value,
  () => {
    if (isAnimated.value === false) {
      const { set } = useSpringAnimation(squareRef, initialProps, {
        stiffness: 500,
        damping: 5,
      });

      return set;
    }

    return (properties: MotionProperties) => _.noop(properties);
  }
);

// dragging
const drag = ({ dragging, movement: [x, y] }: FullGestureState<"drag">) => {
  if (dragging)
    set.value({
      x,
      y,
      scale: 1.25,
      cursor: "grabbing",
    });
  else set.value(initialProps);
};

// hovering
const hover = ({ hovering }: FullGestureState<"move">) => {
  if (hovering) set.value({ scale: 1.15 });
  else set.value(initialProps);
};

// exposed
defineExpose({ isAnimated, squareRef });
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
