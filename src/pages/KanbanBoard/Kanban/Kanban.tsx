import React, {useEffect, useState} from "react";
import "./Kanban.scss";
import {
    DragDropContext,
    DropResult,
} from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn/KanbanColumn";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import {Column} from "../../../interfaces/ApiTypes";
import useMaxSequence from "../../../components/CustomHooks/useMaxSequence";
import {useUpdateBoardMutation} from "../../../api/boardApi";
import useUpdateColumns from "../../../components/CustomHooks/useUpdateColumns";

interface props {
    kanbanBoard: Column[]
    setNewTaskUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    kanbanName: string;
    kanbanDescription: string;
}

const Kanban: React.FC<props> = ({
                                     kanbanBoard, setNewTaskUpdate, id,
                                     kanbanName, kanbanDescription
                                 }) => {
    const [addTask, setAddTask] = useState(false);
    const [addTaskColumn, setAddTaskColumn] = useState<number | undefined>();
    const [changedColumnTasks, setChangedColumnTasks] = useState(false);
    const [columns, setColumns] = useState(kanbanBoard);
    const [updateBoard] = useUpdateBoardMutation();

    //custom hooks
    const maxSequence = useMaxSequence(columns, addTaskColumn!);
    const updateColumns = useUpdateColumns(changedColumnTasks, id, columns, kanbanName,
        kanbanDescription, setChangedColumnTasks)

    useEffect(() => {
        setColumns(kanbanBoard);
    }, [kanbanBoard])

    useEffect(() => {
        setNewTaskUpdate(addTask);
    }, [addTask])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const {source, destination} = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find(column => column.id === Number(source.droppableId))!;
            const destColumn = columns.find(column => column.id === Number(destination?.droppableId))!;
            const sourceItems = [...sourceColumn.tasks!];
            const destItems = [...destColumn.tasks!];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns(
                columns.map((column: any, index: number) => {
                    if (column.id === Number(source.droppableId)) {
                        return {
                            ...column,
                            tasks: sourceItems.map((task) => {
                                return {
                                    ...task,
                                    columnId: column.id,
                                    sequence: index
                                }
                            }),
                        };
                    }
                    if (column.id === Number(destination.droppableId)) {
                        return {
                            ...column,
                            tasks: destItems.map((task, index) => {
                                return {
                                    ...task,
                                    columnId: column.id,
                                    sequence: index
                                }
                            }),
                        };
                    }
                    return column;
                })
            );
        } else {
            const column = columns.find(column => column.id === Number(source.droppableId))!;
            const copiedItems = [...column.tasks!];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns(
                columns.map((columnElement: any) => {
                    if (columnElement.id === Number(source.droppableId)) {
                        return {
                            ...columnElement,
                            tasks: copiedItems.map((task, index) => {
                                return {
                                    ...task,
                                    sequence: index
                                }
                            }),

                        };
                    }
                    return columnElement;
                })
            );
        }
        setChangedColumnTasks(true);
    };


    return (
        <div className="kanban_content">
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                {columns &&
                    columns.map((column, id) => {
                        return (
                            <KanbanColumn column={column} id={id} setAddTask={setAddTask}
                                          setAddTaskColumn={setAddTaskColumn}/>
                        );
                    })}
            </DragDropContext>
            {addTask && (
                <AddTaskModal open={addTask} setOpen={setAddTask} addTaskColumnId={addTaskColumn}
                              sequence={maxSequence!}/>
            )}
        </div>
    );
};

// @ts-ignore
export default Kanban;
