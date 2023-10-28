import utilJSON from "@data/util.json";
import mainPageJSON from "@data/main.json";
import projectsPageJSON from "@data/projects.json";
import contactsPageJSON from "@data/contacts.json";
import type { Project, ProjectDate } from "@types";

import type { UtilKey, MainPageKey, ProjectsPageKey, ContactsPageKey } from "@injection-keys";

// main page
export const mainPageData: MainPageKey = mainPageJSON;

// projects page
const { projects, squares } = projectsPageJSON;

const projectsWithResolvedPaths: Project[] = projects.map(
  ({ title, date, style, image, preview, cards }) => ({
    title,
    date: date as ProjectDate,
    style,
    image,
    preview,
    cards,
  })
);
export const projectsPageDate: ProjectsPageKey = {
  projects: projectsWithResolvedPaths,
  squares,
};

// contacts page
export const contactsPageData: ContactsPageKey = contactsPageJSON;

// utils
export const utilData: UtilKey = utilJSON;
