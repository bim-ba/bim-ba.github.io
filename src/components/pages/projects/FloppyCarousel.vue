<template>
  <main class="projects-carousel-container">
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
  </main>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

import "swiper/scss";
import "swiper/scss/mousewheel";
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { projectsKey, type ProjectsKeyType } from "@injection-keys";

import FloppyDisk from "@pages/projects/FloppyDisk.vue";

// template refs
const floppiesRef = ref<Array<InstanceType<typeof FloppyDisk>> | null>(null);

// inject
const projects = inject(projectsKey) as NonNullable<ProjectsKeyType>;

// exposed
defineExpose({ floppiesRef });
</script>

<style lang="scss" scoped>
@use "~/swiper/swiper.scss";

.projects-carousel-container {
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
</style>
