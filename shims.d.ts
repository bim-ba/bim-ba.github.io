import type { Swiper, SwiperSlide } from "swiper/vue";

declare module "vue" {
  export interface GlobalComponents {
    SwiperContainer: typeof Swiper;
    SwiperSlide: typeof SwiperSlide;
  }
}

declare module "vue-router" {
  export interface RouteMeta {
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

import type { MaybeRef } from "vue";
import type {
  PermissiveTarget,
  MotionProperties,
  PermissiveMotionProperties,
  StyleProperties,
  TransformProperties,
} from "@vueuse/motion";
declare module "@vueuse/motion" {
  export function useMotionProperties(
    target: MaybeRef<PermissiveTarget>,
    defaultValues?: Partial<MotionProperties>
  ): {
    motionProperties: PermissiveMotionProperties;
    style: StyleProperties;
    transform: TransformProperties;
  };
}

export {};
