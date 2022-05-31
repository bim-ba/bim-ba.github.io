import type CSS from "csstype";

import type { AnimeAnimParams, AnimeCallBack } from "animejs";

export const bubbleJellyAnimation: AnimeAnimParams = { scale: [0, 1], scaleY: [0, 1] };
export const bubbleAnimation: AnimeAnimParams = { scale: [0, 1] };

const overwriteCSSProperty = <T extends keyof CSS.PropertiesHyphen>(
  property: T,
  value: CSS.PropertiesHyphen[T]
): { begin: AnimeCallBack["begin"]; complete: AnimeCallBack["complete"] } => {
  return {
    begin: ({ animatables }) =>
      animatables.forEach(({ target }) => target.style.setProperty(property, value)),
    complete: ({ animatables }) =>
      animatables.forEach(({ target }) => target.style.removeProperty(property)),
  };
};

/** WARN: using this will overwrite existing `transform-origin` to `bottom` on element
 * this property will be cleared on animation end
 */
export const riseFromBottomAnimation: AnimeAnimParams = {
  scaleY: [0, 1],
  ...overwriteCSSProperty("transform-origin", "bottom"),
};
/** WARN: using this will overwrite existing `transform-origin` to `top` on element
 * this property will be cleared on animation end
 */
export const riseFromTopAnimation: AnimeAnimParams = {
  scaleY: [0, 1],
  ...overwriteCSSProperty("transform-origin", "bottom"),
};

export const slideFromLeftAnimation: AnimeAnimParams = {
  translateX: ["-100%", 0],
  skewX: [60, 0],
  scaleY: [0, 1],
};
export const slideFromRightAnimation: AnimeAnimParams = {
  translateX: ["100%", 0],
  skewX: [-60, 0],
  scaleY: [0, 1],
};
