export interface MessageInfo {
  date: string;
  date_unixtime: string;
  from: string;
  from_id: string;
  text: string | string[];
}

export interface History {
  name: string;
  messages: MessageInfo[];
}
