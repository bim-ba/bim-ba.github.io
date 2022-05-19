<template>
  <vue-final-modal classes="modal-container" content-class="modal-content" :esc-to-close="true">
    <div class="modal-wrapper">
      <div class="images-container">
        <img v-for="(img, index) in images" :key="index" :src="img.source" alt="project-image" />
      </div>
      <div class="content-wrapper">
        <h1 class="title">{{ title }}</h1>
        <span class="description">{{ description }}</span>
        <div class="abstract-rectangle"></div>
      </div>
      <span class="footer-date">{{ formattedDate }}</span>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { ProjectDate, ProjectImage } from "@types";

// PROPS
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = Omit<Project, "style">;
interface ThisProps {
  title: string;
  description: string;
  date: ProjectDate;
  images: ProjectImage[];
}
const props = defineProps<ThisProps>();

// COMPUTED
const formattedDate = computed(() => {
  return `${props.date.year} / ${props.date.quarters.map((quarter) => "Q" + quarter).join("-")}`;
});
const titleFontSize = computed(() => {
  return Math.pow(18 / props.title.length, 0.5) * 3;
});
const descriptionFontSize = computed(() => {
  return titleFontSize.value / 2;
});
const dateFontSize = computed(() => {
  return titleFontSize.value / 4;
});
</script>

<style lang="scss" scoped>
$width: 90%;
$height: 90%;

$title-font-size: v-bind('titleFontSize + "em"');
$title-font-weight: 900;
$description-font-size: v-bind('descriptionFontSize + "em"');
$date-font-size: v-bind('dateFontSize + "em"');

$background-color: tomato;

$image-height: 30vh;
$images-gap: 1em;

:deep(.modal-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.modal-content) {
  background: $background-color url(@assets/svg/cross-pattern.svg) center no-repeat !important;
  height: $width !important;
  width: $height !important;
  border-radius: 0 !important;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
  align-items: center;
  justify-content: center;
}
.modal-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 90% 10%;
  grid-template-areas:
    "images content"
    "footer footer";
  grid-column-gap: 3em;
  height: 100%;
  padding: 1em 3em;
  box-sizing: border-box;
  .images-container {
    grid-area: images;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $images-gap;

    img {
      flex-grow: 1;
      object-fit: cover;

      height: $image-height;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .content-wrapper {
    grid-area: content;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .title {
      font-size: $title-font-size;
      font-weight: $title-font-weight;
    }
    .description {
      font-size: $description-font-size;
      width: 10em;
    }
    .abstract-rectangle {
      border: 0.5em solid white;
      background: salmon;
      flex-grow: 1;
      margin: 3em 1em;
    }
  }
  .footer-date {
    grid-area: footer;

    align-self: end;
    justify-self: center;
    font-size: $date-font-size;
  }
}
</style>
