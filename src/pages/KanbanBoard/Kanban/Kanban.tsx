import React, {useState} from "react";
import "./Kanban.scss";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn/KanbanColumn";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import {Column} from "../../../interfaces/ApiTypes";

interface props {
    kanbanBoard:Column[]
}


const itemsFromBackend = [
    {
        id: 0,
        content: "First task",
    },
    {
        id: 1,
        content: "Second task",
    },
];

const columnsFromBackend = [
    {
        name: "Todo",
        tasks: itemsFromBackend,
        id: 2,
    },
    {
        name: "Second",
        tasks: [],
        id: 5,
    },
];

const Kanban:React.FC<props> = ({kanbanBoard}) => {
    console.log(kanbanBoard);
    const [addTask, setAddTask] = useState(false);
    const [addTaskColumn, setAddTaskColumn] = useState<number | undefined>();
    const [columns, setColumns] = useState(columnsFromBackend);
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const {source, destination} = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find(column => column.id === Number(source.droppableId))!;
            console.log(sourceColumn);
            const destColumn = columns.find(column => column.id === Number(destination?.droppableId))!;
            console.log(destColumn);
            const sourceItems = [...sourceColumn.tasks];
            const destItems = [...destColumn.tasks];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns(
                columns.map((column: any, index: number) => {
                    if (column.id === Number(source.droppableId)) {
                        return {
                            ...column,
                            tasks: sourceItems,
                        };
                    }
                    if (column.id === Number(destination.droppableId)) {
                        return {
                            ...column,
                            tasks: destItems,
                        };
                    }
                    return column;
                })
            );
        } else {
            const column = columns.find(column => column.id === Number(source.droppableId))!;
            const copiedItems = [...column.tasks];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns(
                columns.map((columnElement: any) => {
                    if (columnElement.id === Number(source.droppableId)) {
                        return {
                            ...columnElement,
                            tasks: copiedItems,
                        };
                    }
                    return columnElement;
                })
            );
        }
    };

    return (
        <div className="kanban_content">
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                {kanbanBoard &&
                    kanbanBoard.map((column, id) => {
                        return (
                            <KanbanColumn column={column} id={id} setAddTask={setAddTask}
                                          setAddTaskColumn={setAddTaskColumn}/>
                        );
                    })}
            </DragDropContext>
            {addTask && (
                <AddTaskModal open={addTask} setOpen={setAddTask} addTaskColumnId={addTaskColumn}/>
            )}
        </div>
    );
};

// @ts-ignore
export default Kanban;
