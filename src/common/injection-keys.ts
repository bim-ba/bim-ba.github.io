import type { InjectionKey } from "vue";
import type { CityArea, Directions, Square, Content, Project, Contact } from "@types";

// main page
export interface MainPageKey {
  content: Content;
  location: {
    area: CityArea;
    coordinates: Directions;
  };
  squares: Array<Square>;
}
export const mainPageKey = Symbol() as InjectionKey<MainPageKey>;

// projects page
export interface ProjectsPageKey {
  projects: Array<Project>;
  squares: Array<Square>;
}
export const projectsPageKey = Symbol() as InjectionKey<ProjectsPageKey>;

// contacts page
export interface ContactsPageKey {
  title: string;
  content: Array<string>;
  contacts: Array<Contact>;
}
export const contactsPageKey = Symbol() as InjectionKey<ContactsPageKey>;

// utils
export interface UtilKey {
  rotationRequest: string;
}
export const utilKey = Symbol() as InjectionKey<UtilKey>;
