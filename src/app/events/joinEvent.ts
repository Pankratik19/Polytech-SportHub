export interface JoinEvent {
  id?: number;
  memberNames: string;
  memberCount: number;
  groupNumber: string;
  email: string;
  status?: string;
  eventId?: number;
  submittedAt?: Date;
}
