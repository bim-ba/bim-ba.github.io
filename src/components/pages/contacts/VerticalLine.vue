<template>
  <div class="vertical-line"></div>
</template>

<!-- this is needed to type component -->
<script setup lang="ts"></script>

<style lang="scss">
$line-width: 0.075em;
$line-height: 100vh;
$line-color: #ccc;

.vertical-line {
  grid-area: line;

  width: $line-width;
  height: $line-height;

  background: $line-color;
}
</style>
