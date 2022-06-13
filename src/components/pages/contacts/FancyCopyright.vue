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
.copyright-container {
  grid-area: copyright;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 1em 5em;

  font-size: 0.5em;

  span {
    color: #777;
  }
}
</style>
