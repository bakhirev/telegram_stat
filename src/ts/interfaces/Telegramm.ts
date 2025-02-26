export interface TelegramReactionAuthor {
  from_id: string;
}

export interface TelegramReactionInfo {
  type: string;
  count: number;
  recent: TelegramReactionAuthor[];
}

export interface TelegramMessageInfo {
  date: string; // "2021-02-03T17:21:38",
  date_unixtime: string; // "1612362098"
  from: string;
  from_id: string;
  text: string | string[];
  reactions: TelegramReactionInfo[];
}

export interface TelegramHistory {
  name: string;
  messages: TelegramMessageInfo[];
}
