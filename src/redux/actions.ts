import { Board, Column, Store, Task } from "./types";
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const ADD_COLUMN = "ADD_COLUMN";
export const REMOVE_COLUMN = "REMOVE_COLUMN";
export const ADD_BOARD = "ADD_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";

export type ActionTypes =
  | { type: typeof ADD_TASK; payload: { task: Task; column: Column } }
  | { type: typeof REMOVE_TASK; payload: { number: number; column: Column } }
  | { type: typeof ADD_COLUMN; payload: { Board: Board; Column: Column } }
  | { type: typeof REMOVE_COLUMN; payload: { number: number; Board: Board } }
  | { type: typeof ADD_BOARD; payload: { Board: Board; Store: Store } }
  | { type: typeof REMOVE_BOARD; payload: { number: number; Store: Store } };

export const addTask = (Task: Task, Column: Column): ActionTypes => ({
  type: ADD_TASK,
  payload: { task: Task, column: Column },
});

export const deleteTask = (id: number, Column: Column): ActionTypes => ({
  type: REMOVE_TASK,
  payload: { number: id, column: Column },
});

export const addColumn = (Board: Board, Column: Column): ActionTypes => ({
  type: ADD_COLUMN,
  payload: { Board, Column },
});

export const removeColumn = (id: number, Board: Board): ActionTypes => ({
  type: REMOVE_COLUMN,
  payload: { number: id, Board: Board },
});

export const addBoard = (Board: Board, Store: Store): ActionTypes => ({
  type: ADD_BOARD,
  payload: { Board: Board, Store: Store },
});

export const removeBoard = (id: number, Store: Store): ActionTypes => ({
  type: REMOVE_BOARD,
  payload: { number: id, Store: Store },
});
