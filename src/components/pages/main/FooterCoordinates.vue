<template>
  <span v-element-hover="onHover">{{ formattedLocation }}</span>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

import { vElementHover } from "@vueuse/components";

import { footerCoordinatesKey } from "@injection-keys";
import type { Coordinates, CityArea, CardinalPoint } from "@types";

// REACTIVE
const revealLocation = ref(false);

// INJECT
const { coordinates, area } = inject(footerCoordinatesKey) as {
  coordinates: Coordinates;
  area: CityArea;
};

// COMPUTED
const formattedLocation = computed(() => {
  if (revealLocation.value) {
    return `${area.city} / ${area.distrinct}`;
  }

  let strings: string[] = [];

  for (const [crdName, crdData] of Object.entries(coordinates) as [string, CardinalPoint][]) {
    const firstLetterUpper = crdName[0].toUpperCase();
    const formattedCardinal = formatCardinal(crdData);
    strings.push(`${firstLetterUpper} ${formattedCardinal}`);
  }

  return strings.join(" / ");
});

// METHODS
function formatCardinal({ degrees, minutes, seconds }: CardinalPoint) {
  const degreesString = degrees ? `${degrees}\u00B0` : ""; // \u00B0 is degree symbol
  const minutesString = minutes ? `${minutes}'` : "";
  const secondsString = seconds ? `${seconds}"` : "";

  return degreesString + minutesString + secondsString;
}

function onHover(state: boolean) {
  revealLocation.value = state;
}
</script>

<style lang="scss" scoped>
$font-size: 0.6em;
$font-weight: 500;
$font-size-hover: 0.65em;
$padding: 0.25em;

span {
  padding: $padding;

  font-size: $font-size;
  font-weight: $font-weight;

  align-self: end;

  transition: background-color 0.5s ease-out, color 0.5s ease-out, font-size 0.5s ease-out;
  transform-origin: bottom;

  &:hover {
    background-color: black;
    color: white;

    font-size: $font-size-hover;

    &::selection {
      color: black;
      background: white;
    }
  }
}
</style>
