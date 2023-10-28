<template>
  <img class="aside-image" :class="[props.side, { 'peered-out': peeredOut }]" :src="props.src" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import _ from "lodash";

/* props
`src: string` - image source
`side: "top" | "left" | "right"` - where image is peered out
*/
const props = defineProps<{
  src: string;
  side: "top" | "left" | "right";
}>();

// data
const limit = 20;

const rotationConstraints = {
  top: [limit - 10, limit - 10],
  left: [-(90 - limit), -(90 - limit / 2)],
  right: [90 - limit, 90 - limit / 2],
};

const [r_min, r_max] = rotationConstraints[props.side];
const rotation = _.random(r_min, r_max);

const randomRotation = {
  top: `rotate(${rotation}deg)`,
  left: `rotate(${rotation}deg)`,
  right: `rotate(${rotation}deg)`,
};
const pickedRotation = randomRotation[props.side];

const pickedOffset = _.random(10, 50);

// reactive
const peeredOut = ref(false);

// methods
const show = () => (peeredOut.value = true);
const hide = () => (peeredOut.value = false);

// exposed
defineExpose({ show, hide });
</script>

<style scoped lang="scss">
$image-size: 5em;
$image-border-radius: 15%;
$image-hover-offset: calc((2 / 3) * $image-size);

.aside-image {
  position: absolute;

  width: $image-size;
  height: $image-size;

  border-radius: $image-border-radius;
  object-fit: cover;
  transition: transform 0.25s ease-out;

  &.top {
    top: 0;
    left: v-bind('pickedOffset + "%"');

    transform: translateY(10%) rotate(90deg);
    &.peered-out {
      transform: translate(0, -80%) v-bind(pickedRotation);
    }
  }
  &.left {
    top: calc($image-size + v-bind('pickedOffset + "%"'));
    left: 0;

    transform: translateX(10%);
    &.peered-out {
      transform: translate(-80%, 0) v-bind(pickedRotation);
    }
  }
  &.right {
    top: v-bind('pickedOffset + "%"');
    left: calc(100% - $image-size);

    transform: translateX(-10%);
    &.peered-out {
      transform: translate(80%, 0) v-bind(pickedRotation);
    }
  }
}
</style>
