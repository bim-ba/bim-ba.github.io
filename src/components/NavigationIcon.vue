<template>
  <router-link :to="to">
    <img ref="navigationIconRef" v-hover="hover" src="/svg/favicon.svg" alt="appicon" />
  </router-link>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { computedWithControl } from "@vueuse/core";
import type { FullGestureState } from "@vueuse/gesture";
import type { MotionProperties } from "@vueuse/motion";

import _ from "lodash";

import type { Nullable } from "@antfu/utils";

import { useSpringAnimation, useInitialProps } from "@common/composables";

/** props
 * @prop size: `number` - icon size in `em's`
 * @prop to: `string` - icon source (relative)
 * @prop reversed: `boolean` - icon is reversed or not
 */
// used in template and in styling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  size: number;
  to: string;
  reversed?: boolean;
}>();

// template refs
const navigationIconRef = ref<Nullable<HTMLElement>>(null);

// reactive
const isAnimated = ref<boolean>();

// initial props
const initialProps = useInitialProps({ scale: 1 });

// spring-set function
const set = computedWithControl(
  () => isAnimated.value,
  () => {
    if (isAnimated.value === false) {
      const { set } = useSpringAnimation(navigationIconRef, initialProps, {
        stiffness: 500,
      });

      return set;
    }

    return (properties: MotionProperties) => _.noop(properties);
  }
);

// hovering
const hover = ({ hovering }: FullGestureState<"move">) => {
  if (hovering) set.value({ scale: 1.15 });
  else set.value(initialProps);
};

// exposed
defineExpose({ isAnimated });
</script>

<style lang="scss" scoped>
$width: v-bind('size + "em"');

a {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: $width;
    rotate: v-bind('reversed ? "180deg" : "none"');
  }
}
</style>
