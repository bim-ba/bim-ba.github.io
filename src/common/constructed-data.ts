import projectsJSON from "@data/projects.json";
import footerSquaresJSON from "@data/footer-squares.json";
import backgroundSquaresJSON from "@data/background-squares.json";
import coordinatesJSON from "@data/coordinates.json";
import contentJSON from "@data/content.json";
import type { Project, ProjectDate, Square, Coordinates, CityArea, Content } from "@types";

export const content: Content = contentJSON;
export const footerSquares: Square[] = footerSquaresJSON;
export const backgroundSquares: Square[] = backgroundSquaresJSON;
export const coordinates: { coordinates: Coordinates; area: CityArea } = coordinatesJSON;

export const projects: Project[] = projectsJSON.map((project) => ({
  title: project.title,
  description: project.description,
  date: project.date as ProjectDate,
  style: project.style,
  images: project.images.map((img) => ({
    source: resolveAssetURL(`/projects/${project.folder}`, img, import.meta.url),
    primary: img.split(".")[0] == "main" ? true : false,
  })),
}));

function resolveAssetURL(relativeFolderPath: string, filenameWithExtension: string, base?: string) {
  return new URL(`${relativeFolderPath}/${filenameWithExtension}`, base).href;
}
