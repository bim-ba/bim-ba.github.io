<template>
  <ProjectModal
    v-model="showModal"
    :title="title"
    :date="date"
    :description="description"
    :images="images"
  />
  <div ref="floppyRef" class="floppy-container" @click="showModal = true">
    <div class="frame-container">
      <img :src="primaryImage?.source" alt="project primary image" />
      <span>{{ title }}</span>
    </div>
    <h2 :style="randomRotation">{{ formattedDate }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ProjectDate, ProjectImage } from "@types";

import ProjectModal from "@components/ProjectModal.vue";

// REACTIVE
const showModal = ref(false);

// PROPS
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

// COMPUTED
const computedTitleFontSize = computed(() => {
  return 12 / props.title.length;
});
const formattedDate = computed(() => {
  return `${props.date.year} / ${props.date.quarters.map((quarter) => "Q" + quarter).join("-")}`;
});
const randomRotation = computed(() => {
  const [min, max] = [1, 8];
  return { transform: `rotate(${generateRandomNumber(min, max)}deg)` };
});
const primaryImage = computed(() => {
  return props.images.find((image) => image.primary);
});

// METHODS
function generateRandomNumber(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
</script>

<style lang="scss" scoped>
$container-font-size: v-bind('isPrimary ? "1em" : "0.75em"');

$floppy-color: v-bind(color);
$floppy-size: 20em;

$frame-color: black;

$title-color: white;
$title-selected-color: black;
$title-selected-background-color: white;
$title-font-size: v-bind('computedTitleFontSize + "em"');

$date-color: midnightblue;
$date-font: "Indie Flower";
$date-font-size: 0.75em;

.floppy-container {
  cursor: pointer;

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

  font-size: $container-font-size;
  max-height: $floppy-size;

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

    span {
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
