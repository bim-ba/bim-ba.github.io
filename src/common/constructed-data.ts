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
  ({ title, description, date, style, image, preview }) => ({
    title: title,
    description: description,
    date: date as ProjectDate,
    style: style,
    image: image,
    preview: preview,
  })
);
export const projectsPageDate: ProjectsPageKeyType = {
  projects: projectsWithResolvedPaths,
  squares,
};

// contacts page
export const contactsPageData: ContactsPageKeyType = contactsPageJSON;
