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
  hints: Array<string>;
}

export interface Square {
  color: string;
  size: number;
  offset?: number;
  breakLinesBefore?: number;
  breakLinesAfter?: number;
}

export interface CardinalPoint {
  degrees?: number;
  minutes?: number;
  seconds?: number;
}

export interface Coordinates {
  north?: CardinalPoint;
  soth?: CardinalPoint;
  west?: CardinalPoint;
  east?: CardinalPoint;
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
