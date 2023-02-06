export interface Task {
  id?: number;
  name: string;
  description: string;
  sequence: number;
}
export interface Column {
  id?: number;
  name: string;
  tasks?: Task[];
}
export interface Board {
  id?: number;
  name: string;
  columns?: Column[];
}
