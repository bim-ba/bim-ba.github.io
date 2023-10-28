import { ref, unref } from "vue";
import type { MaybeRef } from "vue";

import anime from "animejs";
import type { AnimeParams } from "animejs";

import { useSpring, useMotionProperties } from "@vueuse/motion";
import type { PermissiveTarget, PermissiveMotionProperties, Spring } from "@vueuse/motion";

export const useSpringAnimation = (
  target: MaybeRef<PermissiveTarget>,
  initialProperties: PermissiveMotionProperties,
  springParameters?: Partial<Spring> & { target?: MaybeRef<PermissiveTarget> }
) => {
  const { motionProperties } = useMotionProperties(target, initialProperties);
  const { set } = useSpring(motionProperties, springParameters);

  return { set, motionProperties };
};

export const useInitialProps = (props: PermissiveMotionProperties) => props;

export const useTimeline = (params?: MaybeRef<AnimeParams>) => {
  const timeLineParams = unref(params);

  const timeline = anime.timeline(timeLineParams);
  const isFinished = ref(false);

  timeline.finished.then(() => (isFinished.value = true));

  return { timeline, isFinished };
};
