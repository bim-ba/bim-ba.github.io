<template>
  <section class="contacts-page-container">
    <Paragraphs ref="paragraphsRef" />
    <ContactList ref="contactsRef" />
    <VerticalLine ref="lineRef" />
    <FancyFooter ref="footerRef" />
    <FancyCopyright ref="copyrightRef" />
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
  clearCSSProperties,
} from "@/common/animations";

import type { Nullable } from "@antfu/utils";

import VerticalLine from "@pages/contacts/VerticalLine.vue";
import ContactList from "@pages/contacts/ContactList.vue";
import Paragraphs from "@pages/contacts/ContentParagraphs.vue";
import FancyFooter from "@pages/contacts/FancyFooter.vue";
import FancyCopyright from "@pages/contacts/FancyCopyright.vue";

// template refs
const paragraphsRef = ref<Nullable<InstanceType<typeof Paragraphs>>>(null);
const copyrightRef = ref<Nullable<InstanceType<typeof FancyCopyright>>>(null);
const contactsRef = ref<Nullable<InstanceType<typeof ContactList>>>(null);
const footerRef = ref<Nullable<InstanceType<typeof FancyFooter>>>(null);
const lineRef = ref<Nullable<InstanceType<typeof VerticalLine>>>(null);

// reactive
const { timeline } = useTimeline();

onMounted(() =>
  timeline
    // paragraphs (1-3)
    .add({
      targets: paragraphsRef.value?.paragraphsRef,
      delay: anime.stagger(500, { start: 500 }),
      ...riseFromBottomAnimation,

      complete: () => {
        for (const paragraphRef of paragraphsRef.value!.paragraphsRef!)
          clearCSSProperties(paragraphRef, ["transform"]);
      },
    })
    // contacts title
    .add(
      {
        targets: contactsRef.value?.titleRef,
        ...riseFromBottomAnimation,

        complete: () => clearCSSProperties(contactsRef.value!.titleRef, ["transform"]),
      },
      "-=500"
    )
    // contacts (1-3)
    .add(
      {
        targets: contactsRef.value?.contactsRef?.map(({ $el }) => $el),
        delay: anime.stagger(300),
        ...slideFromRightAnimation,

        complete: () =>
          contactsRef.value!.contactsRef!.forEach((contactRef) =>
            clearCSSProperties(contactRef, ["transform"])
          ),
      },
      "-=500"
    )
    // footer icon
    .add(
      {
        begin: () => (footerRef.value!.iconRef!.isAnimated = true),

        targets: footerRef.value?.iconRef?.$el,
        ...bubbleJellyAnimation,

        complete: () => {
          footerRef.value!.iconRef!.isAnimated = false;
          clearCSSProperties(footerRef.value!.iconRef!, ["transform"]);
        },
      },
      "-=500"
    )
    // copyright
    .add(
      {
        targets: copyrightRef.value?.$el,
        ...riseFromBottomAnimation,

        complete: () => clearCSSProperties(copyrightRef, ["transform"]),
      },
      "-=1000"
    )
    // line
    .add(
      {
        targets: lineRef.value?.$el,
        scaleY: [0, 1],
        easing: "easeOutBounce",

        complete: () => clearCSSProperties(lineRef, ["transform"]),
      },
      "-=500"
    )
);
</script>

<style lang="scss" scoped>
.contacts-page-container {
  display: grid;
  grid-template-areas:
    "main   line contacts"
    "footer line copyright";
  grid-template-rows: 85% auto;
  grid-template-columns: auto auto auto;

  height: 100%;
}
</style>
