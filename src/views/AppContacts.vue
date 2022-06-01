<template>
  <section class="contacts-page-container">
    <Paragraphs ref="paragraphsRef" />
    <ContactList ref="contactsRef" />
    <VerticalLine ref="lineRef" />
    <FancyFooter ref="footerRef" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import anime from "animejs";

import { useTimeline } from "@common/composables";
import {
  bubbleJellyAnimation,
  riseFromBottomAnimation,
  slideFromRightAnimation,
} from "@/common/animations";

import type { Nullable } from "@/types/helpers";

import VerticalLine from "@pages/contacts/VerticalLine.vue";
import ContactList from "@pages/contacts/ContactList.vue";
import Paragraphs from "@pages/contacts/ContentParagraphs.vue";
import FancyFooter from "@pages/contacts/FancyFooter.vue";

// template refs
const paragraphsRef = ref<Nullable<InstanceType<typeof Paragraphs>>>(null);
const contactsRef = ref<Nullable<InstanceType<typeof ContactList>>>(null);
const footerRef = ref<Nullable<InstanceType<typeof FancyFooter>>>(null);
const lineRef = ref<Nullable<InstanceType<typeof VerticalLine>>>(null);

// reactive
const { timeline } = useTimeline();

onMounted(() =>
  timeline
    .add({
      targets: paragraphsRef.value?.paragraphsRef,
      delay: anime.stagger(500, { start: 500 }),
      ...riseFromBottomAnimation,
    })
    .add({ targets: contactsRef.value?.titleRef, ...riseFromBottomAnimation }, "-=500")
    .add(
      {
        targets: contactsRef.value?.contactsRef?.map(({ $el }) => $el),
        delay: anime.stagger(300),
        ...slideFromRightAnimation,
      },
      "-=500"
    )
    .add({ targets: footerRef.value?.iconRef?.$el, ...bubbleJellyAnimation }, "-=500")
    .add({ targets: lineRef.value?.lineRef, scaleY: [0, 1], easing: "easeOutBounce" })
);
</script>

<style lang="scss" scoped>
.contacts-page-container {
  display: grid;
  grid-template-areas:
    "main   some contacts"
    "footer some ........";
  grid-template-rows: 85% auto;
  grid-template-columns: auto 1em auto;

  height: 100%;
}
</style>
