export interface IOptions {
  max: number;
  order: string[];
  suffix: string;
  otherTitle: string;
  color: any;
  limit: number;
  formatter?: Function;
}

export interface ISubLine {
  title: string;
  value: number;
  width: number;
  description?: string;
}