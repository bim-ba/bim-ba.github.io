<template>
  <div class="wrapper">
    <ColoredSquare
      v-for="({ color, size, offset }, index) in squares"
      ref="squaresRef"
      :key="index"
      :size="size"
      :color="color"
      :offset="offset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

import { whenever } from "@vueuse/core";
import { useMagicKeys } from "@vueuse/core";

import { useSpring, useMotionProperties } from "@vueuse/motion";
import type { MotionProperties, PermissiveMotionProperties } from "@vueuse/motion";

import { generateRandomNumber } from "@common/helpers";
import { projectsPageKey, type ProjectsPageKeyType } from "@injection-keys";
import type { Nullable } from "@/types/helpers";

import ColoredSquare from "@components/ColoredSquare.vue";

// inject
const { squares } = inject(projectsPageKey) as NonNullable<ProjectsPageKeyType>;

// template refs
const squaresRef = ref<Nullable<Array<InstanceType<typeof ColoredSquare>>>>(null);

// computed
const nonDraggingSquaresRef = computed(() =>
  squaresRef.value?.filter((squareRef) => !squareRef.isDragging)
);

// space key pressing
const initialProps: MotionProperties = { y: 0 };

const { space } = useMagicKeys();

whenever(space, () => {
  const randomSquareRef = nonDraggingSquaresRef.value?.at(
    generateRandomNumber(0, nonDraggingSquaresRef.value.length)
  )?.squareRef;

  const { motionProperties } = useMotionProperties(randomSquareRef, initialProps);
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
.wrapper {
  display: flex;
  place-self: center;
}
</style>
