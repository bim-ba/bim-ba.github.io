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
      <swiper-slide
        v-for="({ title, date, style, image, preview, hints }, index) in projects"
        :key="index"
      >
        <FloppyDisk
          ref="floppiesRef"
          :title="title"
          :date="date"
          :preview="preview"
          :image="image"
          :hints="hints"
          :color="style.color"
          :is-primary="style.primary"
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

import { projectsPageKey, type ProjectsPageKeyType } from "@injection-keys";
import type { Nullable } from "@/types/utils";

import FloppyDisk from "@pages/projects/FloppyDisk.vue";

// template refs
const floppiesRef = ref<Nullable<Array<InstanceType<typeof FloppyDisk>>>>(null);

// inject
const { projects } = inject(projectsPageKey) as NonNullable<ProjectsPageKeyType>;

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
