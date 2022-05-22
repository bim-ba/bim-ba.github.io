// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as runtimeCore from "@vue/runtime-core";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement | ComponentPublicInstance | ComponentPublicInstance[];
    };
  }
}
