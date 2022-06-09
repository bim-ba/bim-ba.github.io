import type CSS from "csstype";

import type { AnimeAnimParams, AnimeCallBack } from "animejs";
import type { Nullable } from "@/types/helpers";

const overwriteCSSProperty = <T extends keyof CSS.PropertiesHyphen>(
  property: T,
  value: CSS.PropertiesHyphen[T]
): { begin: AnimeCallBack["begin"]; complete: AnimeCallBack["complete"] } => {
  return {
    begin: ({ animatables }) =>
      animatables.forEach(
        ({ target }) => target.style.setProperty(property, value as Nullable<string>) // remove Nullable
      ),
    complete: ({ animatables }) =>
      animatables.forEach(({ target }) => target.style.removeProperty(property)),
  };
};

export const bubbleJellyAnimation: AnimeAnimParams = { scale: [0, 1], scaleY: [0, 1] };
export const bubbleAnimation: AnimeAnimParams = { scale: [0, 1] };

/** WARN: using this will overwrite existing `transform-origin` to `bottom` on element,
 * this property will be cleared on the animation end
 */
export const riseFromBottomAnimation: AnimeAnimParams = {
  scaleY: [0, 1],
  ...overwriteCSSProperty("transform-origin", "bottom"),
};
/** WARN: using this will overwrite existing `transform-origin` to `top` on element,
 * this property will be cleared on the animation end
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

export const normalScale = (value: number): AnimeAnimParams => ({ scale: value });
export const slightlyScale = (value: number): AnimeAnimParams => ({ scale: value });
