declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement | ComponentPublicInstance | ComponentPublicInstance[];
    };
  }
}

export {};
