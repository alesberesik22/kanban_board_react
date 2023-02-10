import React, {useEffect, useState} from 'react';
import './AddTaskModal.scss'
import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box/Box";
import AddColumns from "../../AddColumnModal/AddColumnModalButtons/AddColumns";
import CancelColumn from "../../AddColumnModal/AddColumnModalButtons/CancelColumn";

interface props {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    addTaskColumnId:number | undefined;
}

const AddTaskModal:React.FC<props> = (props) => {
    const [taskName, setTaskName] = useState("");
    const [containsData, setContainsData] = useState(false);
    const handleClose = () => {
        props.setOpen(false);
    }

    const handleSubmit = ( event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    useEffect(()=>{
        if(taskName !== "") {
            setContainsData(true);
        } else {
            setContainsData(false);
        }
    },[taskName])

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Box className={"addTaskModal"}>
                <form className={"addTaskModal_container"} onSubmit={(e)=>handleSubmit(e)}>
                    <h2>Add task</h2>
                    <div className="addTaskModal_container_input">
                        <input
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <label className={containsData ? "top" : ""}>Task name</label>
                    </div>
                    <div className="addTaskModal_container_buttons">
                        <AddColumns type={"submit"}>Add</AddColumns>
                        <CancelColumn type={"button"} onClick={()=>props.setOpen(false)}>Cancel</CancelColumn>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default AddTaskModal;