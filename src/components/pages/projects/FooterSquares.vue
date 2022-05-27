<template>
  <div class="wrapper">
    <ColoredSquare
      v-for="(square, index) in footerSquares"
      ref="squaresRef"
      :key="index"
      :size="props.size"
      :color="square.color"
      :offset="square.offset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

import { whenever } from "@vueuse/core";
import { useMagicKeys } from "@vueuse/core";

import { useSpring, useMotionProperties } from "@vueuse/motion";
import type { MotionProperties, PermissiveMotionProperties } from "@vueuse/motion";

import { generateRandomNumber } from "@common/helpers";
import { squaresKey, type SquaresKeyType } from "@injection-keys";

import ColoredSquare from "@components/ColoredSquare.vue";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...;
interface ThisProps {
  size: number;
}
const props = defineProps<ThisProps>();

// inject
const { footerSquares } = inject(squaresKey) as NonNullable<SquaresKeyType>;

// template refs
const squaresRef = ref<Array<InstanceType<typeof ColoredSquare>> | null>(null);

// space key pressing
const initialProps: MotionProperties = { y: 0 };

const { space } = useMagicKeys();

whenever(space, () => {
  const squareRef = squaresRef.value?.at(Math.floor(Math.random() * squaresRef.value.length));

  const { motionProperties } = useMotionProperties(squareRef?.squareRef, initialProps);
  const { set } = useSpring(motionProperties as PermissiveMotionProperties, {
    stiffness: 500,
    repeat: 1,
    repeatType: "mirror",
  });

  const offsetY = generateRandomNumber(-300, -30);
  set({ y: offsetY });
});

// exposed
defineExpose({ squaresRef });
</script>

<style lang="scss" scoped>
$square-size: v-bind('props.size + "em"');
.wrapper {
  display: flex;
  place-self: center;
  .square {
    width: $square-size;
    height: $square-size;

    flex-shrink: 0;
  }
}
</style>
