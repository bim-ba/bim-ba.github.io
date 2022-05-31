<template>
  <ProjectModal v-model="showModal">
    <template #title>{{ title }}</template>
    <template #description>{{ description }}</template>
    <template #images>
      <img
        v-for="(img, index) in props.images"
        :key="index"
        :src="img.source"
        alt="project image"
      />
    </template>
    <template #footer>{{ formattedDate }}</template>
  </ProjectModal>
  <div class="floppy-shadow-container">
    <div ref="floppyRef" class="floppy-container" @click="showModal = true">
      <div class="frame-container">
        <img :src="primaryImage?.source" alt="project primary image" />
        <p>{{ title }}</p>
      </div>
      <h2 :style="{ transform: randomRotation }">{{ formattedDate }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useSpring, useMotionProperties } from "@vueuse/motion";
import type { MotionProperties, PermissiveMotionProperties } from "@vueuse/motion";

import { useHover } from "@vueuse/gesture";
import type { FullGestureState } from "@vueuse/gesture";

import { generateRandomNumber } from "@common/helpers";
import type { ProjectDate, ProjectImage } from "@types";
import type { Nullable } from "@/types/helpers";

import ProjectModal from "@components/ProjectModal.vue";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  title: string;
  description: string;
  date: ProjectDate;
  images: ProjectImage[];
  color?: string;
  isPrimary?: boolean;
}
const props = withDefaults(defineProps<ThisProps>(), { color: "gray" });

// template refs
const floppyRef = ref<Nullable<HTMLElement>>(null);

// reactive
const showModal = ref(false);

// computed
const formattedDate = computed(
  () => `${props.date.year} / ${props.date.quarters.map((quarter) => "Q" + quarter).join("-")}`
);
const randomRotation = computed(() => {
  const [min, max] = [1, 8];
  return `rotate(${generateRandomNumber(min, max)}deg)`;
});
const primaryImage = computed(() => props.images.find((image) => image.primary));

// hovering
const initialProps: MotionProperties = { scale: 1 };
const { motionProperties } = useMotionProperties(floppyRef, initialProps);
const { set } = useSpring(motionProperties as PermissiveMotionProperties, { stiffness: 300 });

const hover = ({ hovering }: FullGestureState<"move">) => {
  if (!hovering) {
    set(initialProps);
    return;
  }
  set({ scale: 1.1, scaleY: 1 });
};
useHover(hover, { domTarget: floppyRef });

// exposed
defineExpose({ floppyRef });
</script>

<style lang="scss" scoped>
$container-font-size: v-bind('isPrimary ? "1em" : "0.75em"');

$floppy-color: v-bind(color);
$floppy-size: 20em;

$frame-color: black;

$title-color: white;
$title-selected-color: black;
$title-selected-background-color: white;
$title-font-size: 1em;

$date-color: midnightblue;
$date-font: "Indie Flower";
$date-font-size: 0.95em;

.floppy-shadow-container {
  filter: drop-shadow(0.15em 0.15em 0.35em rgba(0, 0, 0, 0.5));
  .floppy-container {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 50%;
    grid-template-columns: repeat(4, 25%);
    grid-template-areas:
      "frame frame frame frame"
      "frame frame frame frame"
      "frame frame frame frame"
      "frame frame frame frame"
      "date  date  ..... .....";

    aspect-ratio: 1 / 1;

    mask-image: url(/svg/pure-floppy.svg);
    background-color: $floppy-color;

    // font-size: $container-font-size;
    height: $floppy-size;

    transition: font-size 0.25s ease-out;

    .frame-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      grid-area: frame;

      background-color: $frame-color;
      margin: 0 15%;

      img {
        max-height: 50%;
        max-width: 70%;
        object-fit: cover;
        filter: grayscale(1);
      }

      p {
        color: $title-color;

        font-weight: bold;
        font-size: $title-font-size;

        margin: 0% 15%;

        &::selection {
          color: $title-selected-color;
          background-color: $title-selected-background-color;
        }
      }
    }

    h2 {
      grid-area: date;
      place-self: center;

      color: $date-color;
      font-family: $date-font;
      font-size: $date-font-size;
    }
  }
}

:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content) {
  display: flex;
  flex-direction: column;
  margin: 0 1em;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  background: white;

  width: 500px;
  height: 250px;
}
.modal__title {
  font-size: 2em;
  font-weight: 700;
}
</style>
