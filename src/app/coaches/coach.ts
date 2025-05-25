import { Sport } from '../sports/sport';

export interface Coach {
  id: number;
  name: string;
  photo: string | null;
  additionalInfo: string | null;
  sports: Sport[];
}
