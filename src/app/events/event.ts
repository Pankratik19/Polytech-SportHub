import { Sport } from "../sports/sport";
import { Gender } from "../teams/team";

export interface Event {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  typeEvent?: EventType;
  format?: EventFormat;
  unit?: ResultUnit;
  direction?: Direction;
  gender?: Gender;
  sportId: number;
  sport: Sport;
}

export enum EventType {
  Individual = 'Individual',
  Team = 'Team',
}

export enum EventFormat {
  Table = 'Table',
  Tournament = 'Tournament',
}

export enum ResultUnit {
  Points = 'Points',
  Meters = 'Meters',
  Minutes = 'Minutes',
  Seconds = 'Seconds',
}

export enum Direction {
  Ascending = 'Ascending',
  Descending = 'Descending',
}
