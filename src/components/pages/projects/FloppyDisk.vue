<template>
  <!-- modal -->
  <Teleport to="body">
    <Transition name="fade">
      <FancyProjectModal ref="projectModalRef" :default-image="props.image" />
    </Transition>
  </Teleport>

  <!-- floppy -->
  <div class="floppy-shadow-container">
    <div
      ref="floppyRef"
      v-on-hover="hover"
      class="floppy-container"
      @click="projectModalRef?.show()"
    >
      <div class="frame-container">
        <img
          ref="droppableImageRef"
          class="droppable-image"
          :src="props.preview"
          alt="preview image"
        />
        <p>{{ title }}</p>
      </div>
      <h2 :style="{ transform: randomRotation }">{{ formattedDate }}</h2>
    </div>

    <!-- aside images -->
    <div v-show="!timelined" class="aside-images-container">
      <AsideImage
        v-for="(src, index) in props.cards"
        ref="asideImagesRef"
        :key="index"
        :src="src"
        :side="(position[index] as 'top' | 'left' | 'right')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";

import { useImage } from "@vueuse/core";
import { vElementHover as vOnHover } from "@vueuse/components";

import anime from "animejs";

import { normalScale, slightlyScale } from "@common/animations";
import { shuffle, generateRandomNumber } from "@common/helpers";
import type { ProjectDate } from "@types";
import type { Nullable } from "@/types/utils";

import AsideImage from "./AsideImage.vue";
import FancyProjectModal from "./ProjectModal.vue";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  title: string;
  date: ProjectDate;
  preview: string;
  image: string;
  cards: Array<string>;
  color?: string;
  isPrimary?: boolean;
}
const props = withDefaults(defineProps<ThisProps>(), { color: "gray" });

// template refs
const floppyRef = ref<Nullable<HTMLElement>>(null);
const droppableImageRef = ref<Nullable<HTMLImageElement>>(null);
const asideImagesRef = ref<Nullable<Array<InstanceType<typeof AsideImage>>>>(null);
const projectModalRef = ref<Nullable<InstanceType<typeof FancyProjectModal>>>(null);

// data
const position: Array<"top" | "left" | "right"> = shuffle("top", "left", "right");

// reactive
const timelined = ref<boolean | undefined>(); // used to fix timeline + hover at the same time issue

// computed
const formattedDate = computed(
  () => `${props.date.year} / ${props.date.quarters.map((quarter) => "Q" + quarter).join("-")}`
);
const randomRotation = computed(() => {
  const [min, max] = [1, 8];
  return `rotate(${generateRandomNumber(min, max)}deg)`;
});

// hovering
//
// TODO: this can be optimized
// `anime` on every call creates a new anime instance.
// we can create an anime instace with necessary animation before hover method
// but this will require some extra checks like component is mounted
//
const hover = (state: boolean) => {
  if (timelined.value) return;

  if (state) {
    anime({ targets: floppyRef.value, ...slightlyScale(1.1) });
    asideImagesRef.value?.forEach((img) => img.show());
  } else {
    anime({ targets: floppyRef.value, ...normalScale(1) });
    asideImagesRef.value?.forEach((img) => img.hide());
  }
};

// hooks (image preloader)
onBeforeMount(() => useImage({ src: props.image }));

// exposed
defineExpose({ floppyRef, timelined });
</script>

<style scoped lang="scss">
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
        height: 50%;
        width: 70%;
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
.aside-images-container {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: -1;
}
</style>
