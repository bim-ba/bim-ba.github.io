<template>
  <swiper-container
    :modules="[Mousewheel]"
    :centered-slides="true"
    :grab-cursor="true"
    :mousewheel="true"
    :space-between="250"
    :slides-per-view="3"
    :loop="true"
    :initial-slide="initialSlideIndex"
    @swiperslidechange="onSlideChange"
  >
    <swiper-slide
      v-for="({ title, date, style, image, preview, cards }, index) in projects"
      :key="index"
    >
      <FloppyDisk
        ref="floppiesRef"
        :title="title"
        :date="date"
        :preview="preview"
        :image="image"
        :cards="cards"
        :color="style.color"
        :is-primary="style.primary"
      />
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
// core vue imports
import { ref, inject } from "vue";

// swiper imports
import { register } from "swiper/element/bundle";
import { Mousewheel } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/mousewheel";

// component imports
import FloppyDisk from "@pages/projects/FloppyDisk.vue";

// injection keys
import { projectsPageKey, type ProjectsPageKey } from "@injection-keys";

// type utils
import type { Nullable } from "@antfu/utils";
import type { Swiper } from "swiper";

// template refs
const floppiesRef = ref<Nullable<Array<InstanceType<typeof FloppyDisk>>>>(null);

// inject
const { projects } = inject(projectsPageKey) as NonNullable<ProjectsPageKey>;

// data
const initialSlideIndex = projects.findIndex((project) => project.style.primary === true);

// swiper registration (initialization)
register();

// events
const onSlideChange = ({ detail }: CustomEvent<Swiper[]>) => {
  type RealSwiper = Swiper & { previousRealIndex: number };
  const previosFloppyIndex = (detail[0] as RealSwiper).previousRealIndex;

  if (floppiesRef.value) floppiesRef.value[previosFloppyIndex].hideAsideImages();
};

// exposed
defineExpose({ floppiesRef });
</script>

<style lang="scss" scoped>
$swiper-active-slide-font-size: 1em;
$swiper-inactive-slide-font-size: 0.75em;

swiper-container {
  height: 100%;

  swiper-slide {
    font-size: $swiper-inactive-slide-font-size;
    display: flex;
    justify-content: center;

    margin-top: 5%;
  }
  swiper-slide.swiper-slide-active {
    font-size: $swiper-active-slide-font-size;
  }
}
</style>
