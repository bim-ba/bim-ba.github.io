<!-- TODO -->
<template>
  <swiper
    :modules="[Mousewheel]"
    :grab-cursor="true"
    :mousewheel="true"
    :slides-per-view="3"
    :loop="true"
    :loop-additional-slides="3"
    v-bind="$attrs"
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
</template>

<script setup lang="ts">
import { inject } from "vue";

import "swiper/scss";
import "swiper/scss/mousewheel";
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { projectsKey, type ProjectsKeyType } from "@injection-keys";

import FloppyDisk from "@pages/projects/FloppyDisk.vue";

// inject
const projects = inject(projectsKey) as NonNullable<ProjectsKeyType>;
</script>

<style lang="scss" scoped>
@use "~/swiper/swiper.scss";
// .carousel-container {
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   align-self: center;

//   // overflow: hidden;
//   gap: 5em;
// }
</style>
