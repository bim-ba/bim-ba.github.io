<template>
  <div class="wrapper">
    <div></div>
    <FooterCoordinates ref="coordinatesRef" />
    <NavigationIcon ref="iconRef" :size="3" to="/projects" class="icon" />
  </div>
</template>

<script setup lang="ts">
import NavigationIcon from "@components/NavigationIcon.vue";
import FooterCoordinates from "@pages/main/FooterCoordinates.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;

  position: fixed;
  width: 100%;
  bottom: 1em;
  .icon {
    margin-right: 2.5em;
  }
}
</style>
