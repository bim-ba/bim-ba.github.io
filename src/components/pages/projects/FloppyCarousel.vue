<template>
  <div class="carousel-container">
    <FloppyDisk
      v-for="(project, index) in projects"
      ref="floppies"
      :key="index"
      :title="project.title"
      :description="project.description"
      :date="project.date"
      :images="project.images"
      :color="project.style.color"
      :is-primary="project.style.primary"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { projectsKey } from "@injection-keys";
import type { Project } from "@types";

import FloppyDisk from "@pages/projects/FloppyDisk.vue";

// INJECT
const projects = inject(projectsKey) as Project[];
</script>

<style lang="scss" scoped>
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;

  align-self: center;

  // overflow: hidden;
  gap: 5em;
}
</style>
