export type Base = string;
export type Source = string;
export type Symbol = string;
export interface Record{
  symbol:Symbol;
  source:Source;
  base:Base;
  ts:number;
  open:number;
  high:number;
  low:number;
  close:number;
  volume:number;
}

export interface Row {
  id: number,
  content: any[],
  title: string
}

export interface Item {
  id: number,
  code:string,
  title: string,
  size: string,
  time?: string[],
  symbol?: string[]
}

export interface Tab {
  rows: Row[],
  id?: number,
  title: string
}

export interface Panel {
  id?: number,
  type:string,
  tabs: Tab[],
  content: string,

  title: string
}
export type Workspace = {
  panels:Panel[];
  name:string;
  id:string;
};
