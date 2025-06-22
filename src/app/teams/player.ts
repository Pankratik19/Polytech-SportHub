import { Team } from "./team";

export interface Player {
  id: number;
  name: string;
  groupNumber: string;
  phoneNumber: string;
  team: Team;
  photo?: string;
}
