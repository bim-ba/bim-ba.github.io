declare module "@vue/runtime-core" {
  interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"];
    RouterView: typeof import("vue-router")["RouterView"];
  }
}

declare module "vue-router" {
  interface RouteMeta {
    transition: string;
    title: string;
  }
}

export {};
