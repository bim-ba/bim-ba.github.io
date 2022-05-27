<template>
  <section class="fullname-container">
    <h1 ref="firstnameRef" class="name">{{ firstname }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span ref="descriptionRef" class="description" v-html="normalizedDescriptionInnerHTML"></span>
    <br />
    <h1 ref="lastnameRef" class="name" style="margin-left: 1ch">{{ lastname }}</h1>
  </section>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

import { contentKey } from "@injection-keys";
import type { Content } from "@types";

// inject
const { firstname, lastname, description } = inject(contentKey) as NonNullable<Content>;

// template refs
const firstnameRef = ref<HTMLElement | null>(null);
const lastnameRef = ref<HTMLElement | null>(null);
const descriptionRef = ref<HTMLElement | null>(null);

// computed
const normalizedDescriptionInnerHTML = computed(() => {
  return description.replace("\n", "<br />");
});

// exposed
defineExpose({ firstnameRef, lastnameRef, descriptionRef });
</script>

<style lang="scss" scoped>
$title-font-size: 6em;
$title-font-weight: 900;

$description-font-size: 1.25em;

.fullname-container {
  margin-left: $title-font-size;

  .name,
  .description {
    display: inline-block;
  }

  .name {
    font-size: $title-font-size;
    font-weight: $title-font-weight;
  }

  .description {
    top: 2ch;
    margin-left: 2ch;
    position: relative;

    font-size: $description-font-size;
    font-weight: 500;

    transform-origin: bottom;
  }
}
</style>
