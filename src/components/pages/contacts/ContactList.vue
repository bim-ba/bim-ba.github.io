<template>
  <aside class="contacts-container">
    <h1 ref="titleRef">{{ title }}</h1>
    <SingleContact
      v-for="({ type, data, link, copyable }, index) in contacts"
      ref="contactsRef"
      :key="index"
      :type="type"
      :data="data"
      :link="link"
      :copyable="copyable"
    />
  </aside>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import type { Nullable } from "@antfu/utils";

import { contactsPageKey, type ContactsPageKey } from "@injection-keys";

import SingleContact from "@pages/contacts/SingleContact.vue";

// injected
const { contacts, title } = inject(contactsPageKey) as NonNullable<ContactsPageKey>;

// template refs
const titleRef = ref<Nullable<HTMLHeadingElement>>(null);
const contactsRef = ref<Nullable<Array<InstanceType<typeof SingleContact>>>>(null);

// exposed
defineExpose({ titleRef, contactsRef });
</script>

<style lang="scss" scoped>
$contacts-gap: 2em;
$contacts-padding-left: 3em;
$contacts-padding-right: 5em;
$contacts-font-size: 2em;
.contacts-container {
  grid-area: contacts;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: $contacts-gap;

  padding-left: $contacts-padding-left;
  padding-right: $contacts-padding-right;

  h1 {
    font-size: $contacts-font-size;
  }
}
</style>
