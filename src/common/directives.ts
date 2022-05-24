import type { ObjectDirective } from "vue";
import type { AnimeTimelineInstance } from "animejs";

export const vDemo: ObjectDirective<HTMLElement> = {
  created(el, binding, vnode, prevVNode) {
    console.log(el, binding, vnode, prevVNode);
  },
};

export const vTimeLineAnimation: ObjectDirective<
  HTMLElement,
  { timeline: AnimeTimelineInstance; targets: HTMLElement | HTMLElement[]; animation: object }
> = {
  mounted(el, binding) {
    const targets = binding.value.targets;
    const timeline = binding.value.timeline;
    const animation = binding.value.animation;
    console.log(el, targets, timeline, animation);

    timeline.add({
      targets: targets,
      ...animation,
    });

    timeline.play();
  },
};
