export interface ReactionAuthor {
  from_id: string;
}

export interface ReactionInfo {
  type: string;
  count: number;
  recent: ReactionAuthor[];
}

export interface MessageInfo {
  date: string;
  date_unixtime: string;
  from: string;
  from_id: string;
  text: string | string[];
  reactions: ReactionInfo[];
}

export interface History {
  name: string;
  messages: MessageInfo[];
}
