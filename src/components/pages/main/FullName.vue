<template>
  <div class="fullname-container">
    <h1 ref="firstname" class="name">{{ firstname }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span ref="description" class="description" v-html="normalizedDescriptionHTML"></span>
    <br />
    <h1 ref="lastname" class="name" style="margin-left: 1ch">{{ lastname }}</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { contentKey } from "@injection-keys";
import type { Content } from "@types";

// INJECT
const { firstname, lastname, description } = inject(contentKey) as Content;

// COMPUTED
const normalizedDescriptionHTML = computed(() => {
  return description.replace("\n", "<br />");
});
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
