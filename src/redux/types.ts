export interface Task {
  id: number;
  name: string;
  description: string;
  columnId: number;
  sequence: number;
  priority: string;
}

export interface Column {
  id: number;
  name: string;
  boardId: number;
  tasks: Task[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface Store {
  boards: Board[];
}
