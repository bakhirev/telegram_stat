export interface ReactionAuthor {
  from_id: string;
}

export interface ReactionInfo {
  type: string;
  count: number;
  recent: ReactionAuthor[];
}

export interface MessageInfo {
  date: string; // "2021-02-03T17:21:38"
  day: number,
  dayInMonth: number,
  hours: number,
  minutes: number,
  month: number,
  year: number,
  week: 0,
  timestamp: string; // "2021-02-03"
  milliseconds: number,

  name: string;
  userId: string;

  text: string;
  reactions: ReactionInfo[];
}

export interface History {
  name: string;
  messages: MessageInfo[];
}
