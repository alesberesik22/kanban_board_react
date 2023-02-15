import React from 'react';
import './HomeColumnTask.scss'
import {Task} from "../../../../interfaces/ApiTypes";

interface props {
    tasks:Task[]
}

const HomeColumnTask:React.FC<props> = ({tasks}) => {
    return (
        <div className={"home_boards_body_columns-column"}>
            {tasks.map((task) => (
                <div className={"home_boards_body_columns-column-task"}>
                    <div className={`task_priority ${task.priority}`}/>
                    <p className="task_name">{task.name}</p>
                    <p className={"task_description"}>{task.description}</p>
                </div>
            ))}
        </div>
    );
};

export default HomeColumnTask;
