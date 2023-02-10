import Box from "@mui/material/Box/Box";
import Modal from "@mui/material/Modal/Modal";
import React, {FormEvent, useEffect, useState} from "react";
import "./AddColumnModal.scss";
import AddColumns from "./AddColumnModalButtons/AddColumns";
import CancelColumn from "./AddColumnModalButtons/CancelColumn";
import {useAddColumnMutation} from "../../../api/columnApi";

interface Props {
  id:String;
  displayModal: boolean;
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddColumnModal: React.FC<Props> = (props) => {
  const [columnName, setColumnName] = useState("");
  const [containsData, setContainsData] = useState(false);
  const [updateColumns] = useAddColumnMutation();
  const handleCloseModal = () => {
    props.setDisplayModal(false);
  };

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateColumns({name:columnName,boardId:Number(props.id)});
    setColumnName("");

  }

  useEffect(() => {
    if (columnName !== "") {
      setContainsData(true);
    } else {
      setContainsData(false);
    }
  }, [columnName]);

  return (
    <Modal open={props.displayModal} onClose={handleCloseModal}>
      <Box className="addColumnModal">
        <form className="addColumnModal_container" onSubmit={(e)=> handleSubmit(e)}>
          <h2>Add new column</h2>
          <div className="addColumnModal_container_input">
            <input
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
            <label className={containsData ? "top" : ""}>Column name</label>
          </div>
          <div className="addColumnModal_container_buttons">
            <AddColumns type={"submit"}>Add</AddColumns>
            <CancelColumn type={"button"} onClick={()=>props.setDisplayModal(false)}>Cancel</CancelColumn>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddColumnModal;
