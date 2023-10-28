<template>
  <p ref="footerCoordinatesRef" v-hover="hover">
    {{ revealLocation ? decodedLocation : encodedLocation }}
  </p>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

import { computedWithControl } from "@vueuse/core";
import type { FullGestureState } from "@vueuse/gesture";
import type { MotionProperties } from "@vueuse/motion";

import _ from "lodash";

import type { Nullable } from "@antfu/utils";

import { useInitialProps, useSpringAnimation } from "@common/composables";
import { mainPageKey, type MainPageKey } from "@injection-keys";
import type { Point } from "@types";

// injected
const { location } = inject(mainPageKey) as NonNullable<MainPageKey>;

// template refs
const footerCoordinatesRef = ref<Nullable<HTMLParagraphElement>>(null);

// reactive
const isAnimated = ref<boolean>();
const revealLocation = ref(false);

// computed
const encodedLocation = computed(() => {
  const strings: string[] = [];

  for (const [pointDirection, pointData] of Object.entries(location.coordinates) as Array<
    [string, Point]
  >) {
    const firstDirectionLetter = pointDirection[0];
    const formattedPoint = formatPoint(pointData);
    strings.push(`${firstDirectionLetter} ${formattedPoint}`);
  }

  return strings.join(" / ");
});
const decodedLocation = computed(() => `${location.area.city} / ${location.area.distrinct}`);

// methods
const formatPoint = ({ degrees, minutes, seconds }: Point) => {
  const degreesString = degrees ? `${degrees}\u00B0` : ""; // \u00B0 is degree symbol
  const minutesString = minutes ? `${minutes}'` : "";
  const secondsString = seconds ? `${seconds}"` : "";

  return degreesString + minutesString + secondsString;
};

// initial props
const initialProps = useInitialProps({ scale: 1 });

// spring-set function
const set = computedWithControl(
  () => isAnimated.value,
  () => {
    if (isAnimated.value === false) {
      const { set } = useSpringAnimation(footerCoordinatesRef, initialProps, {
        stiffness: 500,
      });

      return set;
    }

    return (properties: MotionProperties) => _.noop(properties);
  }
);

// hovering
const hover = ({ hovering }: FullGestureState<"move">) => {
  revealLocation.value = hovering;

  if (hovering) set.value({ scale: 1.15 });
  else set.value(initialProps);
};

//exposed
defineExpose({ isAnimated });
</script>

<style lang="scss" scoped>
$font-size: 0.6em;
$font-weight: 500;
$padding: 0.25em;

p {
  position: relative;
  align-self: end;

  padding: $padding;

  font-size: $font-size;
  font-weight: $font-weight;

  transition: color 0.25s ease-out;

  text-transform: uppercase;

  &:hover {
    color: white;
    text-transform: capitalize;

    &::selection {
      color: black;
      background: white;
    }

    &::after {
      transform: scaleY(1);
      transform-origin: bottom;
    }
  }

  &::after {
    content: "";
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: black;
    transform: scaleY(0);
    transform-origin: top;

    transition: transform 0.25s ease-out;
  }
}
</style>
