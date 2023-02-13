import React from 'react';
import './DeleteColumnModal.scss'
import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box/Box";
import AddColumns from "../../../AddColumnModal/AddColumnModalButtons/AddColumns";
import CancelColumn from "../../../AddColumnModal/AddColumnModalButtons/CancelColumn";
import {useDeleteColumnMutation} from "../../../../../api/columnApi";

interface props {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    id:number;
    name:string;
}

const DeleteColumnModal:React.FC<props> = (props) => {
    const [deleteColumnMutation] = useDeleteColumnMutation()

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleDeleteColumn = () => {
        deleteColumnMutation(props.id)
    }

    return (
        <Modal open={props.open} onClose={handleClose}>
            <Box className={"deleteColumn-modal"}>
                <div className={"deleteColumn-modal_container"}>
                    <p>Are you sure you want to delete column <span>{props.name}</span> ? </p>
                    <div className={"deleteColumn-modal_container_buttons"}>
                        <AddColumns type={"button"} onClick={handleDeleteColumn}>Delete</AddColumns>
                        <CancelColumn type={"button"} onClick={handleClose}>Cancel</CancelColumn>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default DeleteColumnModal;
