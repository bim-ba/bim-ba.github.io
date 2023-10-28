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

/*
props

`type: string` - contact type (telegram, twitter, vkontakte, etc...)
`data: string` - contact text (anything you want)
`link: string` - contact link (html-like link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href)
`copyable: boolean?` - `true` if you want to copy `data` to user clipboard, `false` if not
*/
const props = defineProps<{
  type: string;
  data: string;
  link: string;
  copyable?: boolean;
}>();

// copy
const { copy, isSupported } = useClipboard();

// check clipboard-api support by user browser
if (!isSupported && props.copyable)
  console.error(
    `unfortunately, clipboard api is not supported in your browser, so we cannot copy my ${props.type.toLowerCase()}! 😢`
  );
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
