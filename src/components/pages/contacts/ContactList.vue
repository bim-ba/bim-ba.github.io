<template>
  <aside class="contacts-container">
    <h1>CONTACT</h1>
    <SingleContact
      v-for="({ type, data, link, copyable }, index) in contacts"
      :key="index"
      :type="type"
      :data="data"
      :link="link"
      :copyable="copyable"
    />
  </aside>
</template>

<script setup lang="ts">
import { inject } from "vue";

import { contactsPageKey, type ContactsPageKeyType } from "@injection-keys";

import SingleContact from "@pages/contacts/SingleContact.vue";

// injected
const { contacts } = inject(contactsPageKey) as NonNullable<ContactsPageKeyType>;
</script>

<style lang="scss" scoped>
.contacts-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;

  padding-left: 3em;
  padding-right: 5em;

  border-left: 0.1em solid #ccc;

  h1 {
    font-size: 2em;
  }
}
</style>
