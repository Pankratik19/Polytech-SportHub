import { Player } from '../../../teams/player';
import { Event } from '../../event';

export interface TableResult {
  id: number;
  result: number;
  event: Event;
  player: Player;
}
