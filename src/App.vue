<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <div :key="route.path" class="route-container">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<style lang="scss">
@use "@style/reset";

@use "@style/mixins" as mixins;
@use "@style/colors" as colors;
@use "@style/variables" as variables;

@use "@assets/fonts/Fira-Sans/stylesheet" as Fira-Sans;
@use "@assets/fonts/Indie-Flower/stylesheet" as Indie-Flower;

*::selection {
  color: white;
  background: black;
}

html,
body,
#app,
.route-container {
  height: 100%;
}

#app {
  @include mixins.font("Fira Sans", sans-serif, variables.$font-size);
  overflow: hidden;
}

body {
  background: no-repeat center colors.$almost-white url(/svg/dotted-pattern.svg);
}

// page transitions
.scale-bottom-right-enter-active,
.scale-bottom-right-leave-active,
.scale-bottom-left-enter-active,
.scale-bottom-left-leave-active,
.scale-center-enter-active,
.scale-center-leave-active {
  transition: transform 0.25s;
}

.scale-bottom-right-enter-from,
.scale-bottom-right-leave-to,
.scale-bottom-left-enter-from,
.scale-bottom-left-leave-to,
.scale-center-enter-from,
.scale-center-leave-to {
  transform: scale(0);
}

.scale-bottom-right-enter-active,
.scale-bottom-right-leave-active {
  transform-origin: bottom left;
}

.scale-bottom-left-enter-active,
.scale-bottom-left-leave-active {
  transform-origin: bottom right;
}

.scale-center-enter-active,
.scale-center-leave-active {
  transform-origin: center;
}
</style>
