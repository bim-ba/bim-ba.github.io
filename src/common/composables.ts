import { ref, unref } from "vue";
import type { MaybeRef } from "@vueuse/core";

import anime from "animejs";
import type { AnimeParams } from "animejs";

export const useTimeline = (params?: MaybeRef<AnimeParams>) => {
  const timeLineParams = unref(params);

  const timeline = anime.timeline(timeLineParams);
  const isFinished = ref(false);

  timeline.finished.then(() => (isFinished.value = true));

  return { timeline, isFinished };
};
