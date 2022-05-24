<template>
  <!-- <div class="carousel-container">
    <FloppyDisk
      v-for="(project, index) in projects"
      ref="floppiesRef"
      :key="index"
      :title="project.title"
      :description="project.description"
      :date="project.date"
      :images="project.images"
      :color="project.style.color"
      :is-primary="project.style.primary"
    />
  </div> -->
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
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/scss";
import "swiper/scss/mousewheel";

import { projectsKey } from "@injection-keys";
import type { Project } from "@types";

import FloppyDisk from "@pages/projects/FloppyDisk.vue";

// inject
const projects = inject(projectsKey) as Project[];
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
