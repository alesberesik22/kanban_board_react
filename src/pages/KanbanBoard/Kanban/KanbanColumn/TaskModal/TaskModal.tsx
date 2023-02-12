import React, {FormEvent, useEffect, useState} from 'react';
import './TaskModal.scss'
import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box/Box";
import {useGetTaskQuery, useUpdateTaskMutation} from "../../../../../api/taskApi";
import {Task} from "../../../../../interfaces/ApiTypes";
import UpdateTask from "./TaskModalButtons/UpdateTask/UpdateTask";
import CancelTask from "./TaskModalButtons/CancelTask/CanceLTask";

interface props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

const TaskModal: React.FC<props> = (props) => {
    const {data, isFetching} = useGetTaskQuery(props.id);
    const [task, setTask] = useState<Task>();
    const [updateTask] = useUpdateTaskMutation();

    useEffect(() => {
        if (!isFetching) {
            setTask((data))
        }
    }, [isFetching])

    const handleClose = () => {
        props.setOpen(false);
        updateTask(task!);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(task);
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Box className={"taskModal"}>
                {task && (
                    <form className={"taskModal_container"} onSubmit={(e) => handleSubmit(e)}>
                        <input className={"taskModal_container_input"} value={task.name}
                               onChange={(e) => setTask({...task, name: e.target.value})}/>
                        <textarea className={"taskModal_container_textarea"} value={task.description} onChange={(e) => {
                            setTask({...task, description: e.target.value})
                        }}/>
                        <select value={task.priority} onChange={(e) => setTask({...task, priority: e.target.value})}>
                            <option value={"LOW"}>LOW</option>
                            <option value={"MEDIUM"}>MEDIUM</option>
                            <option value={"HIGH"}>HIGH</option>
                        </select>
                        <div className={"taskModal_container_buttons"}>
                            <UpdateTask type={"submit"}>Update</UpdateTask>
                            <CancelTask type={"button"} onClick={handleClose}>Cancel</CancelTask>
                        </div>
                    </form>
                )}
            </Box>
        </Modal>
    );
};

export default TaskModal;
