export type YearQuarter = 1 | 2 | 3 | 4;

export interface ProjectDate {
  year: number;
  quarters: [YearQuarter, YearQuarter?];
}

export interface Project {
  title: string;
  date: ProjectDate;
  style: {
    color: string;
    primary?: boolean;
  };
  preview: string;
  image: string;
  cards: Array<string>;
}

export interface Square {
  color: string;
  size: number;
  offset?: number;
  breakLinesBefore?: number;
  breakLinesAfter?: number;
}

export interface Point {
  degrees?: number;
  minutes?: number;
  seconds?: number;
}

export interface Directions {
  north?: Point;
  soth?: Point;
  west?: Point;
  east?: Point;
}

export interface CityArea {
  city: string;
  distrinct: string;
}

export interface Content {
  firstname: string;
  lastname: string;
  description: string;
}

export interface Contact {
  type: string;
  data: string;
  link: string;
  copyable?: boolean;
}
