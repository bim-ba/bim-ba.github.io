<template>
  <main class="content-container">
    <!-- eslint-disable-next-line vue/no-v-html, prettier/prettier -->
    <p v-for="(paragraph, index) in normalizedParagraphs" :key="index" class="content-paragraph" v-html="paragraph"></p>
  </main>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

import { contactsPageKey, type ContactsPageKeyType } from "@injection-keys";

// injected
const { content } = inject(contactsPageKey) as NonNullable<ContactsPageKeyType>;

// computed
const normalizedParagraphs = computed(() =>
  content.map((paragraph) =>
    paragraph.replace(
      /_((?![_\s])(?:[^_]*[^_\s])?)_/g,
      '<span class="fancy-underlined-text">$1</span>'
    )
  )
);
</script>

<style lang="scss" scoped>
.content-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;

  padding: 0 5em;

  .content-paragraph {
    font-size: 2em;
    font-weight: bold;
  }
}
</style>

<style lang="scss">
.fancy-underlined-text {
  color: black;
  text-decoration: underline solid black 0.1em;

  position: relative;

  transition: color 0.25s ease-out;

  &:hover {
    color: white;
    text-decoration: none;

    &::selection {
      color: black;
      background: white;
    }

    &::after {
      transform: scaleY(1);
      transform-origin: bottom;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: scaleY(0);
    transform-origin: top;
    background: #c61c1d;
    z-index: -1;

    transition: transform 0.25s ease-out;
  }
}
</style>
