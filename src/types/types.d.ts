declare namespace AppTypes {
  type YearQuarter = 1 | 2 | 3 | 4;

  interface ProjectDate {
    year: number;
    quarters: [YearQuarter, YearQuarter?];
  }

  interface ProjectImage {
    source: string;
    primary: boolean;
  }

  interface Project {
    title: string;
    description: string;
    date: ProjectDate;
    images: ProjectImage[];
    style: {
      color: string;
      primary?: boolean;
    };
  }

  interface TestProject extends Project {
    folder: string;
    images: string[];
  }

  interface Square {
    color: string;
    size?: number;
    offset?: number;
    breakLinesBefore?: number;
    breakLinesAfter?: number;
  }

  interface CardinalPoint {
    degrees?: number;
    minutes?: number;
    seconds?: number;
  }

  interface Coordinates {
    north?: CardinalPoint;
    soth?: CardinalPoint;
    west?: CardinalPoint;
    east?: CardinalPoint;
  }

  interface CityArea {
    city: string;
    distrinct: string;
  }

  interface Content {
    firstname: string;
    lastname: string;
    description: string;
  }
}

export = AppTypes;
export as namespace AppTypes;
