import { Coach } from '../coaches/coach';
import { Sport } from '../sports/sport';
import { Player } from './player';

export interface Team {
  id: number;
  name: string;
  gender: string;
  sport?: Sport;
  coach?: Coach;
  players: Player[];
}
