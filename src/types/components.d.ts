declare module "@vue/runtime-core" {
  interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"];
    RouterView: typeof import("vue-router")["RouterView"];
  }
}

export {};
