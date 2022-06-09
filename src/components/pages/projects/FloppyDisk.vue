<template>
  <!-- preload image -->
  <link rel="prefetch" :href="props.image" />

  <!-- modal -->
  <Teleport to="body">
    <Transition name="fade">
      <section v-if="modalOpened" class="modal" @click="modalOpened = false">
        <div class="modal-content">
          <img :src="props.image" />
        </div>
      </section>
    </Transition>
  </Teleport>

  <!-- floppy -->
  <div class="floppy-shadow-container">
    <div ref="floppyRef" v-on-hover="hover" class="floppy-container" @click="modalOpened = true">
      <div class="frame-container">
        <img :src="props.preview" alt="project primary image" />
        <p>{{ title }}</p>
      </div>
      <h2 :style="{ transform: randomRotation }">{{ formattedDate }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { vElementHover as vOnHover } from "@vueuse/components";

import anime from "animejs";

import { normalScale, slightlyScale } from "@common/animations";
import { generateRandomNumber } from "@common/helpers";
import type { ProjectDate } from "@types";
import type { Nullable } from "@/types/helpers";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  title: string;
  description: string;
  date: ProjectDate;
  preview: string;
  image: string;
  color?: string;
  isPrimary?: boolean;
}
const props = withDefaults(defineProps<ThisProps>(), { color: "gray" });

// template refs
const floppyRef = ref<Nullable<HTMLElement>>(null);

// reactive
const modalOpened = ref(false);
const timelined = ref<boolean | undefined>(); // to fix timeline + hover at the same time issue

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
const hover = (state: boolean) =>
  !timelined.value
    ? state
      ? anime({ targets: floppyRef.value, ...slightlyScale(1.1) })
      : anime({ targets: floppyRef.value, ...normalScale(1) })
    : "pass";

// exposed
defineExpose({ floppyRef, timelined });
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

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  overflow-x: hidden; // because of bouncing transition
  overflow-y: scroll;
  // overscroll-behavior: contain;

  z-index: 2;

  background: #2828287f;
  .modal-content {
    display: flex;
    justify-content: center;

    margin: 3em auto;
  }
}

// modal transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
