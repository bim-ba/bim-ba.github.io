<template>
  <router-link :to="to">
    <img ref="navigationIconRef" src="/svg/favicon.svg" alt="appicon" />
  </router-link>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useSpring, useMotionProperties } from "@vueuse/motion";
import type { MotionProperties, PermissiveMotionProperties } from "@vueuse/motion";

import { useHover } from "@vueuse/gesture";
import type { FullGestureState } from "@vueuse/gesture";

import type { Nullable } from "@/types/helpers";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  size: number;
  to: string;
  reversed?: boolean;
}
const props = withDefaults(defineProps<ThisProps>(), { reversed: false });

// template refs
const navigationIconRef = ref<Nullable<HTMLElement>>(null);

// computed
const rotation = computed(() => 180 * (props.reversed as unknown as number));

// hovering
const initialProps: MotionProperties = { scale: 1, rotate: rotation.value };
const { motionProperties } = useMotionProperties(navigationIconRef, initialProps);
const { set } = useSpring(motionProperties as PermissiveMotionProperties, { stiffness: 750 });

const hover = ({ hovering }: FullGestureState<"move">) => {
  if (!hovering) {
    set(initialProps);
    return;
  }
  set({ scale: 1.15 });
};
useHover(hover, { domTarget: navigationIconRef });
</script>

<style lang="scss" scoped>
$width: v-bind('size + "em"');

a {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: $width;
  }
}
</style>
