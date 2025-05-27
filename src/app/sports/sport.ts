import { Team } from "../teams/team";

export interface Sport {
    id: number;
    name: string;
    photo: string;
    coach_id: number;
    teams?: Team[];
}