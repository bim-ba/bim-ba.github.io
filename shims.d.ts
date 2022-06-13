declare module "@vue/runtime-core" {
  interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"];
    RouterView: typeof import("vue-router")["RouterView"];
  }
}

declare module "vue-router" {
  interface RouteMeta {
    transition:
      | "scale-up-left"
      | "scale-up"
      | "scale-up-right"
      | "scale-left"
      | "scale-center"
      | "scale-right"
      | "scale-bottom-left"
      | "scale-bottom"
      | "scale-bottom-right";
    title: string;
    order: number;
  }
}

export {};
