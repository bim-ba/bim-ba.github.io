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
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";

import "swiper/scss";
import "swiper/scss/mousewheel";
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import anime from "animejs";
import { bubbleAnimation, bubbleJellyAnimation } from "@common/animations";

import { projectsKey, type ProjectsKeyType } from "@injection-keys";

import FloppyDisk from "@pages/projects/FloppyDisk.vue";
import NavigationIcon from "@components/NavigationIcon.vue";
import FooterSquares from "@pages/projects/FooterSquares.vue";

// template refs
const iconRef = ref<InstanceType<typeof NavigationIcon> | null>(null);
const squaresRef = ref<InstanceType<typeof FooterSquares> | null>(null);
const floppiesRef = ref<Array<InstanceType<typeof FloppyDisk>> | null>(null);

// data
const timeline = anime.timeline();

// hooks
onMounted(() => {
  const onlyCenteredFloppies = floppiesRef.value
    ?.map(({ floppyRef }) => floppyRef)
    .slice(floppiesRef.value.length / 2 - 1, floppiesRef.value.length / 2 + 2);

  timeline
    .add({
      targets: onlyCenteredFloppies,
      delay: anime.stagger(500, { start: 500 }),
      ...bubbleJellyAnimation,
    })
    .add({ targets: iconRef.value?.$el, ...bubbleJellyAnimation }, "-=500")
    .add(
      {
        targets: squaresRef.value?.squaresRef?.map(({ squareRef }) => squareRef),
        delay: anime.stagger(100, { start: 500 }),
        ...bubbleAnimation,
      },
      0
    );
});

// inject
const projects = inject(projectsKey) as NonNullable<ProjectsKeyType>;
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
