<template>
  <section v-if="modalOpened" ref="projectDropZoneRef" class="modal-container" @click="hide()">
    <div class="modal-content">
      <img :src="props.defaultImage" class="droppable-image" alt="project image" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

/* props
`defaultImage: string` - project image url
*/
const props = defineProps<{
  defaultImage: string;
}>();

// reactive
const modalOpened = ref(false);

// helpers
const show = () => (modalOpened.value = true);
const hide = () => (modalOpened.value = false);

// exposed
defineExpose({ show, hide });
</script>

<style lang="scss" scoped>
$modal-background: #2828287f;
.modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  overflow-x: hidden; // because of bouncing transition
  overflow-y: scroll;
  // overscroll-behavior: contain;

  z-index: 2;

  background: $modal-background;
  .modal-content {
    display: flex;
    justify-content: center;

    margin: 3em auto;
  }
}

// modal transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
