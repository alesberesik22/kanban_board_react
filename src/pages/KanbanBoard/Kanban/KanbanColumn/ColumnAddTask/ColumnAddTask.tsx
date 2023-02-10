import React from 'react';
import './ColumnAddTask.scss'
import AddIcon from '@mui/icons-material/Add';

interface Props {
    setAddTask: React.Dispatch<React.SetStateAction<boolean>>
    id:number;
    setAddTaskColumn:React.Dispatch<React.SetStateAction<number|undefined>>;
}
const ColumnAddTask:React.FC<Props> = (props) => {
    return (
    <div className={"column_add_task"} onClick={()=>{
        props.setAddTask(true);
        props.setAddTaskColumn(props.id);
    }}>
        <div className={"column_add_task_icon"}>
            <AddIcon/>
        </div>
        <div>Add Task</div>
    </div>
    )};

export default ColumnAddTask;