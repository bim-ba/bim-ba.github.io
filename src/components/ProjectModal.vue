<template>
  <vue-final-modal
    :attach="'#app'"
    :esc-to-close="true"
    classes="modal-container"
    content-class="modal-content"
    transition="scale-center"
  >
    <div class="modal-wrapper">
      <section class="images-container">
        <slot name="images" />
      </section>
      <main class="content-container">
        <header ref="titleRef" class="title">
          <slot name="title" />
        </header>
        <section class="description">
          <slot name="description" />
        </section>
        <div class="abstract-rectangle"></div>
      </main>
      <footer class="footer-date">
        <slot name="footer" />
      </footer>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// template refs
const titleRef = ref<HTMLElement | null>(null);

// computed
const titleFontSize = computed(
  () => Math.pow(18 / (titleRef.value?.textContent?.length as NonNullable<number>), 0.5) * 3
);
const descriptionFontSize = computed(() => titleFontSize.value / 2);
const dateFontSize = computed(() => titleFontSize.value / 4);
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
  background: $background-color url(/svg/cross-pattern.svg) center no-repeat !important;
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

    :slotted(img) {
      flex-grow: 1;
      object-fit: cover;

      height: $image-height;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .content-container {
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
