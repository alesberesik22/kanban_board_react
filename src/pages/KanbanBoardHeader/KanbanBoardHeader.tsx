import React, {useState} from 'react';
import './KanbanBoardHeader.scss'
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {useUpdateBoardMutation} from "../../api/boardApi";
import {Board} from "../../interfaces/ApiTypes";

interface Props {
    kabanBoardValues: Board | undefined;
    setKabanBoardValues: React.Dispatch<React.SetStateAction<Board | undefined>>;
}

const KanbanBoardHeader: React.FC<Props> = ({kabanBoardValues, setKabanBoardValues}) => {
    const [editHeader, setEditHeader] = useState(false);
    const [updateBoard] = useUpdateBoardMutation();
    const changeNameAndDescription = () => {
        updateBoard(kabanBoardValues!);
        setEditHeader(false);
    };
    return (
        <div className="kanban_board_header">
            <div className="kanban_board_header_input">
                <input
                    className="header-input"
                    value={kabanBoardValues?.name}
                    onChange={(e) =>
                        setKabanBoardValues({...kabanBoardValues, name: e.target.value})
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
    );
}

export default KanbanBoardHeader;