<template>
  <main class="fullname-container">
    <h1 ref="firstnameRef" class="name">{{ content.firstname }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span ref="descriptionRef" class="description" v-html="normalizedDescriptionInnerHTML"></span>
    <br />
    <h1 ref="lastnameRef" class="name" style="margin-left: 1ch">{{ content.lastname }}</h1>
  </main>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

import { mainPageKey, type MainPageKeyType } from "@injection-keys";
import type { Nullable } from "@/types/helpers";

// inject
const { content } = inject(mainPageKey) as NonNullable<MainPageKeyType>;

// template refs
const firstnameRef = ref<Nullable<HTMLElement>>(null);
const lastnameRef = ref<Nullable<HTMLElement>>(null);
const descriptionRef = ref<Nullable<HTMLElement>>(null);

// computed
const normalizedDescriptionInnerHTML = computed(() => content.description.replace("\n", "<br />"));

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

    transition: color 0.25s ease-out, filter 0.25s ease-out;
  }

  .description {
    top: 2ch;
    margin-left: 2ch;
    position: relative;

    font-size: $description-font-size;
    font-weight: 500;
  }
}
</style>
