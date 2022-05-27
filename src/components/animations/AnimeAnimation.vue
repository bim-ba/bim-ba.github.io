<!-- TODO: directive (single animation / timeline) -->
<template>
  <div ref="container" class="animation-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import anime from "animejs";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    animation: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    anime({
      targets: this.$refs.container as HTMLDivElement,
      ...this.animation,
    });
  },
});
</script>

<style lang="scss" scoped>
.animation-container {
  transform-origin: bottom;
}
</style>
