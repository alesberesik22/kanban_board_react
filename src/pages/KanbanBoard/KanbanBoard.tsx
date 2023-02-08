import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBoardQuery, useUpdateBoardMutation } from "../../api/boardApi";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./KanbanBoard.scss";
import { Board } from "../../interfaces/ApiTypes";
import Kanban from "./Kanban/Kanban";

const KanbanBoard = () => {
  const { id } = useParams();
  const [editHeader, setEditHeader] = useState(false);
  const [updateBoard] = useUpdateBoardMutation();
  const { data, isSuccess, refetch } = useGetBoardQuery(Number(id!));
  const [kabanBoardValues, setKabanBoardValues] = useState<Board>();
  console.log(kabanBoardValues);
  const changeNameAndDescription = () => {
    updateBoard(kabanBoardValues!);
    refetch();
    setEditHeader(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setKabanBoardValues(data);
    }
  }, [data, isSuccess]);
  return (
    <div className="kanban_board">
      <div className="kanban_board_header">
        <div className="kanban_board_header_input">
          <input
            className="header-input"
            value={kabanBoardValues?.name}
            onChange={(e) =>
              setKabanBoardValues({ ...kabanBoardValues, name: e.target.value })
            }
            disabled={!editHeader}
          />
          <div className="kanban_board_header_input_actions">
            {editHeader ? (
              <>
                <CheckIcon
                  className="kanban_board_header_input_actions-confirm"
                  onClick={changeNameAndDescription}
                />
                <ClearIcon
                  className="kanban_board_header_input_actions-clear"
                  onClick={() => setEditHeader(false)}
                />
              </>
            ) : (
              <EditIcon
                className="kanban_board_header_input_actions-edit"
                onClick={() => setEditHeader(true)}
              />
            )}
          </div>
        </div>
        <div className="kannban_board_header_text_area">
          <textarea
            className="header-textarea"
            value={
              kabanBoardValues?.description === null
                ? ""
                : kabanBoardValues?.description
            }
            onChange={(e) =>
              setKabanBoardValues({
                ...kabanBoardValues,
                description: e.target.value,
              })
            }
            disabled={!editHeader}
          />
        </div>
      </div>
      <Kanban/>
    </div>
  );
};

export default KanbanBoard;
