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

import { contactsPageKey, type ContactsPageKeyType } from "@injection-keys";
import type { Nullable } from "@/types/utils";

import SingleContact from "@pages/contacts/SingleContact.vue";

// injected
const { contacts, title } = inject(contactsPageKey) as NonNullable<ContactsPageKeyType>;

// template refs
const titleRef = ref<Nullable<HTMLElement>>(null);
const contactsRef = ref<Nullable<Array<InstanceType<typeof SingleContact>>>>(null);

// exposed
defineExpose({ titleRef, contactsRef });
</script>

<style lang="scss" scoped>
.contacts-container {
  grid-area: contacts;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;

  padding-left: 3em;
  padding-right: 5em;

  h1 {
    font-size: 2em;
  }
}
</style>
