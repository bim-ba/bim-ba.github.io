<template>
  <section>
    <h4>{{ props.type }}</h4>
    <a
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-link"
      @click="() => (copyable ? copy(data) : 'pass')"
    >
      {{ props.data }}
    </a>
  </section>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  type: string;
  data: string;
  link: string;
  copyable?: boolean;
}
const props = defineProps<ThisProps>();

// copy
const { copy } = useClipboard();
</script>

<style lang="scss" scoped>
section {
  position: relative;

  h4 {
    text-transform: capitalize;
  }
  .contact-link {
    position: relative;

    &:hover {
      &::before {
        transform: scaleX(1);
      }
    }

    &::before {
      content: "";
      position: absolute;
      bottom: -0.15em;
      width: 100%;
      height: 0.15em;
      background: black;
      transform: scaleX(0);
      transform-origin: left;

      transition: transform 0.15s ease-out;
    }
  }
}
</style>
