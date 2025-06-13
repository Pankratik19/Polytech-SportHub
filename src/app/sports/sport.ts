import { Team } from '../teams/team';
import { Info } from './info';

export interface Sport {
  id: number;
  name: string;
  photo: string;
  coach_id: number;
  info: Info[];
  teams?: Team[];
}
