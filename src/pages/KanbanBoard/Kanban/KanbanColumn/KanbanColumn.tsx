import React, {useEffect, useState} from 'react';
import './KanbanColumn.scss'
import {Droppable} from "react-beautiful-dnd";
import KanbanCard from "../KanbanCard/KanbanCard";
import ColumnAddTask from "./ColumnAddTask/ColumnAddTask";
import {Column, Task} from "../../../../interfaces/ApiTypes";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import TaskModal from "./TaskModal/TaskModal";
import DeleteColumnModal from "./DeleteColumnModal/DeleteColumnModal";
import UpdateColumnNameModal from "./UpdateColumnNameModal/UpdateColumnNameModal";

interface props {
    column: Column;
    id: number;
    setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    setAddTaskColumn: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const KanbanColumn: React.FC<props> = ({column, id, setAddTask, setAddTaskColumn}) => {
    const [displayTask, setDisplayTask] = useState(false);
    const [clickedTaskId, setClickedTaskId] = useState<number>();
    const [displayDeleteColumn, setDisplayDeleteColumn] = useState(false);
    const [displayUpdateColumnName, setDisplayUpdateColumnName] = useState(false);

    return (
        <div className="kanban_content_column" key={id}>
            <div className={"kanban_content_column_container"}>
                <div className={"kanban_content_column_container_header"}>
                    <h2>{column.name}</h2>
                    <div className={"kanban_content_column_container_header_actions"}>
                        <EditIcon className={"kanban_content_column_container_header_actions_edit"}
                                  onClick={() => setDisplayUpdateColumnName(true)}/>
                        <ClearIcon className={"kanban_content_column_container_header_actions_delete"}
                                   onClick={() => setDisplayDeleteColumn(true)}/>
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
                                {column && column.tasks!.slice()
                                    .sort((a, b) => a.sequence > b.sequence ? 1 : -1)
                                    .map((tasks: Task, index: number) => (

                                        <KanbanCard content={tasks.name} columnId={tasks.id!}
                                                    index={index} key={index}
                                                    description={tasks.description} priority={tasks.priority!}
                                                    setDisplayTask={setDisplayTask} setClickedTask={setClickedTaskId}/>
                                    ))}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
            <ColumnAddTask setAddTask={setAddTask} id={column.id!} setAddTaskColumn={setAddTaskColumn}/>
            {displayTask && (
                <TaskModal open={displayTask} setOpen={setDisplayTask} id={clickedTaskId!} column={column}/>
            )}
            {displayDeleteColumn && (
                <DeleteColumnModal open={displayDeleteColumn} setOpen={setDisplayDeleteColumn} id={column.id!}
                                   name={column.name!}/>
            )}
            {displayUpdateColumnName && (
                <UpdateColumnNameModal open={displayUpdateColumnName} setOpen={setDisplayUpdateColumnName}
                                       column={column}/>
            )}
        </div>
    )
};

export default KanbanColumn;