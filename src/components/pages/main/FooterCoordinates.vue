<template>
  <p ref="footerCoordinatesRef" v-on-hover="hover">
    {{ revealLocation ? decodedLocation : encodedLocation }}
  </p>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

import { vElementHover as vOnHover } from "@vueuse/components";

import anime from "animejs";

import { normalScale, slightlyScale } from "@/common/animations";
import { mainPageKey, type MainPageKeyType } from "@injection-keys";
import type { CardinalPoint } from "@types";
import type { Nullable } from "@/types/utils";

// injected
const { location } = inject(mainPageKey) as NonNullable<MainPageKeyType>;

// template refs
const footerCoordinatesRef = ref<Nullable<HTMLElement>>(null);

// reactive
const revealLocation = ref(false);

// computed
const encodedLocation = computed(() => {
  let strings: string[] = [];

  for (const [crdName, crdData] of Object.entries(location.coordinates) as Array<
    [string, CardinalPoint]
  >) {
    const firstLetterUpper = crdName[0].toUpperCase();
    const formattedCardinal = formatCardinal(crdData);
    strings.push(`${firstLetterUpper} ${formattedCardinal}`);
  }

  return strings.join(" / ");
});
const decodedLocation = computed(() => `${location.area.city} / ${location.area.distrinct}`);

// methods
const formatCardinal = ({ degrees, minutes, seconds }: CardinalPoint) => {
  const degreesString = degrees ? `${degrees}\u00B0` : ""; // \u00B0 is degree symbol
  const minutesString = minutes ? `${minutes}'` : "";
  const secondsString = seconds ? `${seconds}"` : "";

  return degreesString + minutesString + secondsString;
};

// hovering
//
// TODO: this can be optimized
// `anime` on every call creates a new anime instance.
// we can create an anime instace with necessary animation before hover method
// but this will require some extra checks like component is mounted
//
const hover = (state: boolean) => {
  revealLocation.value = state;
  state
    ? anime({ targets: footerCoordinatesRef.value, ...slightlyScale(1.15) })
    : anime({ targets: footerCoordinatesRef.value, ...normalScale(1) });
};
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

  &:hover {
    color: white;

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
