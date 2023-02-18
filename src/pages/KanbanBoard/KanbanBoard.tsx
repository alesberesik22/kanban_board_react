import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBoardQuery, useUpdateBoardMutation } from "../../api/boardApi";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./KanbanBoard.scss";
import { Board } from "../../interfaces/ApiTypes";
import Kanban from "./Kanban/Kanban";
import KanbanHeader from "./KanbanHeader/KanbanHeader";
import AddColumnModal from "./AddColumnModal/AddColumnModal";
import KanbanBoardHeader from "../KanbanBoardHeader/KanbanBoardHeader";
import { useDispatch, useSelector } from "react-redux";
import { setRefetch } from "../../redux/slices/ReduxStoreSlice";

const KanbanBoard = () => {
  const { id } = useParams();
  const { data, isSuccess, refetch } = useGetBoardQuery(Number(id!));
  const [kabanBoardValues, setKabanBoardValues] = useState<Board>();
  const [displayAddColumnKanban, setDisplayAddColumnKanban] = useState(false);
  const [newTaskUpdate, setNewTaskUpdate] = useState(false);

  const fullScreen = useSelector(
    (state: any) => state.reduxStoreSlice.fullscreen
  );
  const refetchData = useSelector(
    (state: any) => state.reduxStoreSlice.refetch
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setKabanBoardValues(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    refetch();
    if (refetchData) {
      refetch();
      dispatch(setRefetch(false));
    }
  }, [displayAddColumnKanban, kabanBoardValues, newTaskUpdate, refetchData]);

  useEffect(() => {
    setKabanBoardValues(data);
  }, [data, isSuccess]);

  return (
    <div className={`kanban_board fullScreen`}>
      <KanbanBoardHeader
        kabanBoardValues={kabanBoardValues}
        setKabanBoardValues={setKabanBoardValues}
      />
      <div className="kaban_board_content_container">
        <KanbanHeader setDisplayAddColumnKanban={setDisplayAddColumnKanban} />
        {data && (
          <Kanban
            kanbanBoard={kabanBoardValues?.columns!}
            setNewTaskUpdate={setNewTaskUpdate}
            id={kabanBoardValues?.id!}
            kanbanName={kabanBoardValues?.name!}
            kanbanDescription={kabanBoardValues?.description!}
          />
        )}
      </div>
      {displayAddColumnKanban && (
        <AddColumnModal
          id={id!}
          displayModal={displayAddColumnKanban}
          setDisplayModal={setDisplayAddColumnKanban}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
