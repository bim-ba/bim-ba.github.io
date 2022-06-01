<template>
  <footer class="contacts-page-footer">
    <NavigationIcon ref="iconRef" to="/projects" :size="3" reversed style="margin-left: 3em" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { Nullable } from "@/types/helpers";

import NavigationIcon from "@components/NavigationIcon.vue";

// template refs
const iconRef = ref<Nullable<InstanceType<typeof NavigationIcon>>>(null);

// exposed
defineExpose({ iconRef });
</script>

<style lang="scss">
.contacts-page-footer {
  grid-area: footer;

  display: flex;
}
</style>
