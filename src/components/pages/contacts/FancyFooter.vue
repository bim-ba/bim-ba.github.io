<template>
  <footer class="contacts-page-footer">
    <NavigationIcon ref="iconRef" to="/projects" :size="3" reversed class="icon" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Nullable } from "@antfu/utils";

import NavigationIcon from "@components/NavigationIcon.vue";

// template refs
const iconRef = ref<Nullable<InstanceType<typeof NavigationIcon>>>(null);

// exposed
defineExpose({ iconRef });
</script>

<style lang="scss" scoped>
.contacts-page-footer {
  grid-area: footer;

  display: flex;

  .icon {
    margin-left: 3em;
  }
}
</style>
