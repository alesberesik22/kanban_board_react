import React, {useEffect, useState} from 'react';
import './AddTaskModal.scss'
import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box/Box";
import AddColumns from "../../AddColumnModal/AddColumnModalButtons/AddColumns";
import CancelColumn from "../../AddColumnModal/AddColumnModalButtons/CancelColumn";
import {useAddTaskMutation} from "../../../../api/taskApi";

interface props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addTaskColumnId: number | undefined;
    sequence: number;
}

const AddTaskModal: React.FC<props> = (props) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState("LOW");
    const [containsData, setContainsData] = useState(false);
    const [addTask] = useAddTaskMutation();
    const handleClose = () => {
        props.setOpen(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTask({
            name: taskName,
            description: taskDescription,
            columnId: props.addTaskColumnId!,
            sequence: props.sequence,
            priority:taskPriority,
        })
        setTaskName("");
        setTaskDescription("");
        setTaskPriority("LOW");
    }

    useEffect(() => {
        if (taskName !== "") {
            setContainsData(true);
        } else {
            setContainsData(false);
        }
    }, [taskName])

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Box className={"addTaskModal"}>
                <form className={"addTaskModal_container"} onSubmit={(e) => handleSubmit(e)}>
                    <h2>Add task</h2>
                    <div className="addTaskModal_container_input">
                        <div className={"addTaskModal_container_input_element"}>
                            <input
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                            <label className={containsData ? "top" : ""}>Task name</label>
                        </div>
                        <div className={"addTaskModal_container_input_element"}>
                            <textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                            <label className={containsData ? "top" : ""}>Task description</label>
                        </div>
                        <div className={"addTaskModal_container_input_element"}>
                            <select onChange={(event) => setTaskPriority(event.target.value)}>
                                <option value={"LOW"}>LOW</option>
                                <option value={"MEDIUM"}>MEDIUM</option>
                                <option value={"HIGH"}>HIGH</option>
                            </select>
                        </div>
                    </div>
                    <div className="addTaskModal_container_buttons">
                        <AddColumns type={"submit"}>Add</AddColumns>
                        <CancelColumn type={"button"} onClick={() => props.setOpen(false)}>Cancel</CancelColumn>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default AddTaskModal;