export interface JoinTeam {
  id?: number;
  memberName: string;
  phoneNumber: string;
  groupNumber: string;
  additionalInfo: string;
  submittedAt?: Date;
  email: string;
  sportId?: number;
  status?: string;
}
