import type { InjectionKey } from "vue";
import type { CityArea, Coordinates, Square, Content, Project } from "@types";

export interface FooterCoordinatesKeyType {
  area: CityArea;
  coordinates: Coordinates;
}
export const footerCoordinatesKey = Symbol() as InjectionKey<FooterCoordinatesKeyType>;

export interface SquaresKeyType {
  footerSquares: Square[];
  backgroundSquares: Square[];
}
export const squaresKey = Symbol() as InjectionKey<SquaresKeyType>;

export type ContentKeyType = Content;
export const contentKey = Symbol() as InjectionKey<ContentKeyType>;

export type ProjectsKeyType = Project[];
export const projectsKey = Symbol() as InjectionKey<ProjectsKeyType>;
