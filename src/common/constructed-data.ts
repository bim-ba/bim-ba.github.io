import mainPageJSON from "@data/main.json";
import projectsPageJSON from "@data/projects.json";
import contactsPageJSON from "@data/contacts.json";
import type { Project, ProjectDate } from "@types";

import type { MainPageKeyType, ProjectsPageKeyType, ContactsPageKeyType } from "@injection-keys";

// main page
export const mainPageData: MainPageKeyType = mainPageJSON;

// projects page
const { projects, squares } = projectsPageJSON;

const projectsWithResolvedPaths: Project[] = projects.map(
  ({ title, date, style, image, preview, hints }) => ({
    title,
    date: date as ProjectDate,
    style,
    image,
    preview,
    hints,
  })
);
export const projectsPageDate: ProjectsPageKeyType = {
  projects: projectsWithResolvedPaths,
  squares,
};

// contacts page
export const contactsPageData: ContactsPageKeyType = contactsPageJSON;
