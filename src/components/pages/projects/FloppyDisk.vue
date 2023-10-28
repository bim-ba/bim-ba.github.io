<template>
  <!-- modal -->
  <Teleport to="body">
    <Transition name="fade">
      <FancyProjectModal ref="projectModalRef" :default-image="props.image" />
    </Transition>
  </Teleport>

  <!-- floppy -->
  <div class="floppy-shadow-container">
    <div ref="floppyRef" v-hover="hover" class="floppy-container" @click="projectModalRef?.show()">
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
    <div v-show="isAnimated === false" class="aside-images-container">
      <AsideImage
        v-for="(src, index) in props.cards"
        ref="asideImagesRef"
        :key="index"
        :src="src"
        :side="position[index]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";

import { useImage, computedWithControl } from "@vueuse/core";
import type { FullGestureState } from "@vueuse/gesture";
import type { MotionProperties } from "@vueuse/motion";

import _ from "lodash";

import { useSpringAnimation } from "@common/composables";
import type { ProjectDate } from "@types";
import type { Nullable } from "@antfu/utils";

import AsideImage from "./AsideImage.vue";
import FancyProjectModal from "./ProjectModal.vue";

/** props
 * @prop title: `string` - floppy title
 * @prop date: `ProjectDate` - project date in custom format (like YYYY / Q[1-4]-Q[1-4])
  - `YYYY` - project year
  - `Q[1-4]` - project quarter
 * @prop preview: `string` - project preview image link
 * @prop image: `string` - project actual image link
 * @prop cards: `string[]` - array of links to side cards
 * @prop color: `string?` - floppy color (any css color)
 * @prop isPrimary: `boolean?` - floppy is centered by default (only one can be)
 */
const props = withDefaults(
  defineProps<{
    title: string;
    date: ProjectDate;
    preview: string;
    image: string;
    cards: Array<string>;
    color?: string;
    isPrimary?: boolean;
  }>(),
  { color: "gray" }
);

// template refs
const floppyRef = ref<Nullable<HTMLElement>>(null);
const droppableImageRef = ref<Nullable<HTMLImageElement>>(null);
const asideImagesRef = ref<Nullable<Array<InstanceType<typeof AsideImage>>>>(null);
const projectModalRef = ref<Nullable<InstanceType<typeof FancyProjectModal>>>(null);

// non-reactive
const position: Array<"top" | "left" | "right"> = _.shuffle(["top", "left", "right"]);

// reactive
const isAnimated = ref<boolean>();

// computed
const formattedDate = computed(() => {
  const { year, quarters } = props.date;
  return `${year} / ${quarters.map((quarter) => "Q" + quarter).join("-")}`;
});
const randomRotation = computed(() => {
  const [min, max] = [1, 8];
  const rotation = _.random(min, max);
  return `rotate(${rotation}deg)`;
});

// initial props
const initialProps = { scale: 1 };

// spring-set function
const set = computedWithControl(
  () => isAnimated.value,
  () => {
    if (isAnimated.value === false) {
      const { set } = useSpringAnimation(floppyRef, initialProps, {
        stiffness: 350,
      });

      return set;
    }

    return (properties: MotionProperties) => _.noop(properties);
  }
);

// hovering
const hover = ({ hovering }: FullGestureState<"move">) => {
  if (hovering) {
    for (const asideImageRef of asideImagesRef.value!) asideImageRef.show();
    set.value({ scale: 1.15 });
  } else {
    for (const asideImageRef of asideImagesRef.value!) asideImageRef.hide();
    set.value(initialProps);
  }
};

// hooks (image preloader)
onBeforeMount(() => useImage({ src: props.image }));

// exposed
defineExpose({ floppyRef, isAnimated });
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

  height: $floppy-size;
  aspect-ratio: 1 / 1;

  z-index: -1;
}
</style>
