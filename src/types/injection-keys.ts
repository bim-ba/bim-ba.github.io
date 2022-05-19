import type { InjectionKey } from "vue";
import type { CityArea, Coordinates, Square, Content, Project } from "@types";

export const footerCoordinatesKey = Symbol() as InjectionKey<{
  coordinates: Coordinates;
  area: CityArea;
}>;
export const squaresKey = Symbol() as InjectionKey<{
  backgroundSquares: Square[];
  footerSquares: Square[];
}>;
export const contentKey = Symbol() as InjectionKey<Content>;
export const projectsKey = Symbol() as InjectionKey<Project[]>;
