<template>
  <router-link :to="to">
    <img src="/svg/favicon.svg" alt="appicon" />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";

// PROPS
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  size: number;
  to: string;
  reversed?: boolean;
}
const props = withDefaults(defineProps<ThisProps>(), { reversed: false });

// COMPUTED
const rotation = computed(() => {
  return 180 * (props.reversed as unknown as number);
});
</script>

<style lang="scss" scoped>
$width: v-bind('size + "em"');
$hovered-width: calc($width + 0.25em);
$rotation: v-bind('rotation + "deg"');

a {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: $width;
    transform: rotate($rotation);

    transition: width 0.25s ease-out;

    &:hover {
      width: $hovered-width;
    }
  }
}
</style>
