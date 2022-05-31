import type { InjectionKey } from "vue";
import type { CityArea, Coordinates, Square, Content, Project, Contact } from "@types";

// main page
export interface MainPageKeyType {
  content: Content;
  location: {
    area: CityArea;
    coordinates: Coordinates;
  };
  squares: Array<Square>;
}
export const mainPageKey = Symbol() as InjectionKey<MainPageKeyType>;

// projects page
export interface ProjectsPageKeyType {
  projects: Array<Project>;
  squares: Array<Square>;
}
export const projectsPageKey = Symbol() as InjectionKey<ProjectsPageKeyType>;

// contacts page
export interface ContactsPageKeyType {
  content: Array<string>;
  contacts: Array<Contact>;
}
export const contactsPageKey = Symbol() as InjectionKey<ContactsPageKeyType>;
