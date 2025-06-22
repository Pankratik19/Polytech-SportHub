export interface Match {
  id: number;
  round: number;
  matchNumber: number;
  positionInNextMatch?: number | null;

  player1?: {
    id: number;
    name: string;
  } | null;

  player2?: {
    id: number;
    name: string;
  } | null;

  winner?: {
    id: number;
    name: string;
  } | null;

  nextMatch?: {
    id: number;
    positionInNextMatch?: number | null;
  } | null;
}
