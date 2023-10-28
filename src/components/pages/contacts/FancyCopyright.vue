<template>
  <div class="copyright-container">
    <span>
      created by
      <a
        class="fancy-underlined-text"
        href="https://github.com/bim-ba"
        target="_blank"
        rel="noopener noreferrer"
        >@bim-ba</a
      >
    </span>
  </div>
</template>

<!-- this is needed to type component -->
<script setup lang="ts"></script>

<style lang="scss" scoped>
$copyright-container-margins: 1em 5em;
$copyright-container-font-size: 0.5em;
$copyright-container-font-color: #777;
.copyright-container {
  grid-area: copyright;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: $copyright-container-margins;

  font-size: $copyright-container-font-size;

  span {
    color: $copyright-container-font-color;
  }
}
</style>
