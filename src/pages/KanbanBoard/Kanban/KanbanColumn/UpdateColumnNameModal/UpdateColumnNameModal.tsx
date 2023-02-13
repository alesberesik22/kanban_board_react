import React, {FormEvent, useState} from 'react';
import './UpdateColumnNameModal.scss'
import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box/Box";
import {Column} from "../../../../../interfaces/ApiTypes";
import AddColumns from "../../../AddColumnModal/AddColumnModalButtons/AddColumns";
import CancelColumn from "../../../AddColumnModal/AddColumnModalButtons/CancelColumn";
import {useUpdateColumnMutation} from "../../../../../api/columnApi";

interface props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    column: Column;
}

const UpdateColumnNameModal: React.FC<props> = (props) => {
    const [column, setColumn] = useState(props.column);
    const [updateColumnMutation] = useUpdateColumnMutation()
    const handleClose = () => {
        props.setOpen(false)
    }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(column);
        updateColumnMutation(column);
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Box className={"updateColumnNameModal"}>
                <form className={"updateColumnNameModal_container"} onSubmit={(event)=>handleSubmit(event)}>
                    <input
                        value={column.name}
                        onChange={(e) => setColumn({...column, name: e.target.value})}
                    />
                    <label className={props.column.name !== "" ? "top" : ""}>Column name</label>
                    <div className={"updateColumnNameModal_container_buttons"}>
                        <AddColumns type={"submit"}>Update</AddColumns>
                        <CancelColumn type={"button"} onClick={handleClose}>Cancel</CancelColumn>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default UpdateColumnNameModal;
