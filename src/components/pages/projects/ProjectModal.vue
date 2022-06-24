<template>
  <section v-if="modalOpened" ref="projectDropZoneRef" class="modal-container" @click="hide()">
    <div class="modal-content">
      <img
        :src="projectDroppedImageSource || props.defaultImage"
        class="droppable-image"
        :class="{ active: isOverProjectDropZone, inactive: !isOverProjectDropZone }"
        alt="project image"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useDropZone } from "@vueuse/core";

import anime from "animejs";

import type { Nullable } from "@/types/utils";

// props
//
// https://github.com/vuejs/core/issues/4294
//
// type ThisProps = ...
interface ThisProps {
  defaultImage: string;
}
const props = defineProps<ThisProps>();

// template refs
const projectDropZoneRef = ref<Nullable<HTMLImageElement>>(null);

// reactive
const modalOpened = ref(false);

// image dropping
const projectDroppedImageSource = ref<string>();

const onProjectImageDrop = (files: Nullable<Array<File>>) => {
  if (!files || files.length > 1) return;

  const file = files[0];

  if (!file.type.startsWith("image/")) {
    anime({
      targets: projectDropZoneRef.value,
      easing: "easeInQuad",
      translateX: [-50, 50, -30, 30, -10, 10, 0, 0],
    });
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => (projectDroppedImageSource.value = event.target?.result as string);

  reader.readAsDataURL(file);
};

const { isOverDropZone: isOverProjectDropZone } = useDropZone(
  projectDropZoneRef,
  onProjectImageDrop
);

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
