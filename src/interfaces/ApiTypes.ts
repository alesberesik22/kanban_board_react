export interface Task {
  id?: number;
  name: string;
  description: string;
  sequence: number;
  columnId:number;
  priority?:string;
  assignedUser?:string;
}
export interface Column {
  id?: number;
  name: string;
  boardId:number;
  tasks?: Task[];
}
export interface Board {
  id?: number;
  name?: string;
  description?: string;
  columns?: Column[];
}
