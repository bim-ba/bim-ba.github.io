<template>
  <p ref="footerCoordinatesRef" v-on-hover="(state) => (revealLocation = state)">
    {{ revealLocation ? decodedLocation : encodedLocation }}
  </p>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

import { vElementHover as vOnHover } from "@vueuse/components";

import { useSpring, useMotionProperties } from "@vueuse/motion";
import type { MotionProperties, PermissiveMotionProperties } from "@vueuse/motion";

import { useHover } from "@vueuse/gesture";
import type { FullGestureState } from "@vueuse/gesture";

import { footerCoordinatesKey, type FooterCoordinatesKeyType } from "@injection-keys";
import type { CardinalPoint } from "@types";

// injected
const { coordinates, area } = inject(footerCoordinatesKey) as NonNullable<FooterCoordinatesKeyType>;

// template refs
const footerCoordinatesRef = ref<HTMLElement | null>(null);

// reactive
const revealLocation = ref(false);

// computed
const encodedLocation = computed(() => {
  let strings: string[] = [];

  for (const [crdName, crdData] of Object.entries(coordinates) as [string, CardinalPoint][]) {
    const firstLetterUpper = crdName[0].toUpperCase();
    const formattedCardinal = formatCardinal(crdData);
    strings.push(`${firstLetterUpper} ${formattedCardinal}`);
  }

  return strings.join(" / ");
});
const decodedLocation = computed(() => {
  return `${area.city} / ${area.distrinct}`;
});

// methods
const formatCardinal = ({ degrees, minutes, seconds }: CardinalPoint) => {
  const degreesString = degrees ? `${degrees}\u00B0` : ""; // \u00B0 is degree symbol
  const minutesString = minutes ? `${minutes}'` : "";
  const secondsString = seconds ? `${seconds}"` : "";

  return degreesString + minutesString + secondsString;
};

// hovering
const initialProps: MotionProperties = {
  scale: 1,
};
const { motionProperties } = useMotionProperties(footerCoordinatesRef, initialProps);
const { set } = useSpring(motionProperties as PermissiveMotionProperties, { stiffness: 300 });

const hover = ({ hovering }: FullGestureState<"move">) => {
  if (!hovering) {
    set(initialProps);
    return;
  }
  set({ scale: 1.15, scaleY: 1 });
};
useHover(hover, { domTarget: footerCoordinatesRef });
</script>

<style lang="scss" scoped>
$font-size: 0.6em;
$font-weight: 500;
$font-size-hover: 0.65em;
$padding: 0.25em;

p {
  padding: $padding;

  font-size: $font-size;
  font-weight: $font-weight;

  align-self: end;

  transform-origin: bottom;
  transition: background 0.25s ease-out, color 0.25s ease-out;

  &:hover {
    color: white;
    background: black;

    &::selection {
      color: black;
      background: white;
    }
  }
}
</style>
