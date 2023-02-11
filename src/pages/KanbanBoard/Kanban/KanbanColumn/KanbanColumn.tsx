import React, {useEffect} from 'react';
import './KanbanColumn.scss'
import {Droppable} from "react-beautiful-dnd";
import KanbanCard from "../KanbanCard/KanbanCard";
import ColumnAddTask from "./ColumnAddTask/ColumnAddTask";
import {Column, Task} from "../../../../interfaces/ApiTypes";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

interface props {
    column: Column;
    id: number;
    setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    setAddTaskColumn: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const KanbanColumn: React.FC<props> = ({column, id, setAddTask, setAddTaskColumn}) => {
    return (
        <div className="kanban_content_column" key={id}>
            <div className={"kanban_content_column_container"}>
                <div className={"kanban_content_column_container_header"}>
                    <h2>{column.name}</h2>
                    <div className={"kanban_content_column_container_header_actions"}>
                        <EditIcon className={"kanban_content_column_container_header_actions_edit"}/>
                        <ClearIcon className={"kanban_content_column_container_header_actions_delete"}/>
                    </div>
                </div>
                <Droppable droppableId={String(column.id)} key={id}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="kanban_content_column_tasks"
                            >
                                {column && column.tasks!.map((tasks: Task, index: number) => (

                                    <KanbanCard content={tasks.name} columnId={tasks.id!} index={index} key={index}/>
                                ))}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
            <ColumnAddTask setAddTask={setAddTask} id={column.id!} setAddTaskColumn={setAddTaskColumn}/>
        </div>
    )
};

export default KanbanColumn;