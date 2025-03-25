
export interface Standup {
  id: string;
  date: string;
  name: string;
  yesterday: string;
  today: string;
  blocked: string;
}

export interface TeamMember {
  name: string;
  hasSubmittedToday: boolean;
}
