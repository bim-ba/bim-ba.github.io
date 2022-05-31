<template>
  <div class="contacts-page-wrapper">
    <Paragraphs />
    <ContactList />
  </div>
</template>

<script setup lang="ts">
import ContactList from "@pages/contacts/ContactList.vue";
import Paragraphs from "@pages/contacts/ContentParagraphs.vue";
</script>

<style lang="scss" scoped>
.contacts-page-wrapper {
  display: flex;
  height: 100%;
}
</style>
