import mainPageJSON from "@data/main.json";
import projectsPageJSON from "@data/projects.json";
import contactsPageJSON from "@data/contacts.json";
import type { Project, ProjectDate } from "@types";

import type { MainPageKeyType, ProjectsPageKeyType, ContactsPageKeyType } from "@injection-keys";

import { resolveAssetURL } from "@common/helpers";

// main page
export const mainPageData: MainPageKeyType = mainPageJSON;

// projects page
const { projects, squares } = projectsPageJSON;

const projectsWithResolvedPaths: Project[] = projects.map((project) => ({
  title: project.title,
  description: project.description,
  date: project.date as ProjectDate,
  style: project.style,
  images: project.images.map((img) => ({
    source: resolveAssetURL(`/projects/${project.folder}`, img, import.meta.url),
    primary: img.split(".")[0] == "main" ? true : false,
  })),
}));
export const projectsPageDate: ProjectsPageKeyType = {
  projects: projectsWithResolvedPaths,
  squares,
};

// contacts page
export const contactsPageData: ContactsPageKeyType = contactsPageJSON;
