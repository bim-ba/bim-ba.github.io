<template>
  <main class="content-container">
    <!-- eslint-disable-next-line vue/no-v-html, prettier/prettier -->
    <p v-for="(paragraph, index) in normalizedParagraphs" ref="paragraphsRef" :key="index" class="content-paragraph" v-html="paragraph"></p>
  </main>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";
import type { Nullable } from "@antfu/utils";

import { contactsPageKey, type ContactsPageKey } from "@injection-keys";

// injected
const { content } = inject(contactsPageKey) as NonNullable<ContactsPageKey>;

// template refs
const paragraphsRef = ref<Nullable<Array<HTMLParagraphElement>>>(null);

/* computed
markdown-like parser (i know this is bad and better to use libs like `marked`, `markdown.it`, etc...)
*/
const normalizedParagraphs = computed(() =>
  content.map((paragraph) =>
    paragraph
      // eslint-disable-next-line prettier/prettier
      .replace(
        /_((?![_\s])(?:[^_]*[^_\s])?)_/g,
        '<span class="fancy-underlined-text">$1</span>'
      )
      .replace(
        /\*((?![*\s])(?:[^*]*[^*\s])?)\*/g,
        '<span class="fancy-backgrounded-text">$1</span>'
      )
      .replace("\n", "<br />")
  )
);

// exposed
defineExpose({ paragraphsRef });
</script>

<style lang="scss" scoped>
$paragraphs-gap: 2em;
$paragraph-font-size: 1.75em;

.content-container {
  --fancy-underlined-text-hover-background: #c61c1d;

  grid-area: main;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: $paragraphs-gap;

  padding: 0 5em;

  .content-paragraph {
    font-size: $paragraph-font-size;
    font-weight: bold;
  }
}
</style>
