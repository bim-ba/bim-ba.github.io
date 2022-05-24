<template>
  <section class="projects-content">
    <swiper
      class="swiper"
      :modules="[Mousewheel]"
      :centered-slides="true"
      :grab-cursor="true"
      :mousewheel="true"
      :space-between="250"
      :slides-per-view="3"
      :loop="true"
      :loop-additional-slides="3"
      :initial-slide="projects.length / 2"
    >
      <swiper-slide v-for="(project, index) in projects" :key="index">
        <FloppyDisk
          ref="floppiesRef"
          :title="project.title"
          :description="project.description"
          :date="project.date"
          :images="project.images"
          :color="project.style.color"
          :is-primary="project.style.primary"
        />
      </swiper-slide>
    </swiper>
  </section>
  <footer class="projects-footer">
    <NavigationIcon
      ref="iconRef"
      reversed
      :size="3"
      to="/"
      style="margin-left: 2em; align-self: start"
    />
    <FooterSquares ref="squaresRef" :size="0.6" style="grid-area: footer" />
  </footer>
  <!-- <div class="grid-wrapper"> -->
  <!-- <FloppyCarousel ref="carouselRef" style="grid-area: floppy" /> -->
  <!-- <NavigationIcon ref="iconRef" reversed :size="3" to="/" style="margin-left: 2em" />
    <FooterSquares ref="squaresRef" :size="0.6" style="grid-area: footer" /> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/scss";
import "swiper/scss/mousewheel";

import { projectsKey } from "@injection-keys";
import type { Project } from "@types";

import { ref, inject, onMounted } from "vue";
import type { ComponentPublicInstance } from "vue";

import anime from "animejs";
import { bubbleAnimation, bubbleJellyAnimation } from "@common/animations";

import FloppyDisk from "@pages/projects/FloppyDisk.vue";
import NavigationIcon from "@components/NavigationIcon.vue";
import FooterSquares from "@pages/projects/FooterSquares.vue";

// data
const timeline = anime.timeline();

// refs
interface ThisComponentPublicInstance extends ComponentPublicInstance {
  $refs: {
    carouselRef: ComponentPublicInstance & {
      $refs: {
        floppiesRef: ComponentPublicInstance[];
      };
    };
    footerRef: ComponentPublicInstance & {
      $refs: {
        squaresRef: ComponentPublicInstance[];
      };
    };
  };
}

// eslint-disable-next-line prettier/prettier
const iconRef = ref<ComponentPublicInstance | null>(
  null
);
const carouselRef = ref<Pick<ThisComponentPublicInstance["$refs"]["carouselRef"], "$refs"> | null>(
  null
);
const squaresRef = ref<Pick<ThisComponentPublicInstance["$refs"]["footerRef"], "$refs"> | null>(
  null
);
// eslint-disable-next-line prettier/prettier
const floppiesRef = ref<ComponentPublicInstance[] | null>(
  null
);

// hooks
onMounted(() => {
  const allFloppies = floppiesRef.value?.map(({ $refs }) => $refs.floppyRef);
  const centeredFloppies = allFloppies?.slice(
    allFloppies.length / 2 - 1,
    allFloppies.length / 2 + 2
  );
  timeline
    .add({
      targets: centeredFloppies,
      delay: anime.stagger(500, { start: 500 }),
      ...bubbleJellyAnimation,
    })
    .add({ targets: iconRef.value?.$el, ...bubbleJellyAnimation }, "-=500")
    .add(
      {
        targets: squaresRef.value?.$refs.squaresRef.map(({ $refs }) => $refs.squareRef),
        delay: anime.stagger(100, { start: 500 }),
        ...bubbleAnimation,
      },
      0
    );
});

// inject
const projects = inject(projectsKey) as Project[];
</script>

<style lang="scss" scoped>
@use "~/swiper/swiper.scss";

.projects-content {
  height: 100%;
  .swiper {
    padding-top: 5%;
    padding-bottom: 10%;
    &:deep(.swiper-slide) {
      font-size: 0.75em;
      display: flex;
      justify-content: center;
    }
    &:deep(.swiper-slide-active) {
      font-size: 1em;
    }
  }
}
.projects-footer {
  display: flex;
  flex-direction: column;
  gap: 1em;

  width: 100%;
  position: fixed;
  bottom: 3em;

  // content padding overlaps href
  z-index: 1;

  & > * {
    flex-grow: 1;
  }
}
</style>
