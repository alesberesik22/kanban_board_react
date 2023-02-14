import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/images/logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavbarAdd from "../Buttons/NavbarAdd/NavbarAdd";
import NavbarCancel from "../Buttons/NavbarCancel/NavbarCancel";
import {
  useAddBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from "../../api/boardApi";
import { Board } from "../../interfaces/ApiTypes";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setFullscreen, setRefetch} from "../../redux/slices/ReduxStoreSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { data, isSuccess, refetch } = useGetBoardsQuery(null);
  const [addKanbanBoard] = useAddBoardMutation();
  const [deleteKanbanBoard] = useDeleteBoardMutation();
  const [updateKanban] = useUpdateBoardMutation();
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [angle, setAngle] = useState(0);
  const [addBoard, setAddBoard] = useState(false);
  const [kanbanName, setKanbanName] = useState("");
  const [error, setError] = useState(false);
  const [editKanban, setEditKanban] = useState<number>(-1);
  const [displayDeleteButtons, setDisplayDeleteButtons] = useState<number>();
  const [updatedKanbanBoardName, setUpdatedKanbanBoardName] = useState("");
  const [boards, setBoards] = useState<Board[]>();

  const fullScreen = useSelector((state:any) => state.reduxStoreSlice.fullscreen);
  const refetchData = useSelector((state:any) => state.reduxStoreSlice.refetch);
  const dispatch = useDispatch();

  const createKanban = () => {
    addKanbanBoard({ name: kanbanName });
    refetch();
    setKanbanName("");
    dispatch(setRefetch(true))
  };

  const cancelKanbanCreation = () => {
    setKanbanName("");
    setAddBoard(false);
  };

  const handleDeleteBoard = (id: number) => {
    deleteKanbanBoard(id);
    setDisplayDeleteButtons(-1);
    refetch();
    dispatch(setRefetch(true))
  };
  const handleUpdateBoard = (id: number) => {
    updateKanban({ name: updatedKanbanBoardName, id: id });
    refetch();
    dispatch(setRefetch(true))
    setUpdatedKanbanBoardName("");
    setEditKanban(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      setBoards(data);
    }
  }, [data, isSuccess, kanbanName]);

  useEffect(() => {
    kanbanName.length > 20 ? setError(true) : setError(false);
  }, [kanbanName]);

  useEffect(()=> {
    if(refetch){
      refetch();
      dispatch(setRefetch(false))
    }
  },[refetchData])

  return (
    <div className={`navbar ${fullScreen ? "full-width" : "small-width"}`}>
      <div className="navbar_container">
        <div className="logo">
          <img src={logo} alt="logo" className="logo_img" />
          {fullScreen && <h2>Kanban app</h2>}
        </div>
        <div className="kanban_boards">
          {isSuccess && (
            <div
              onClick={() => {
                setAngle((prev) => prev + 180);
                setDisplayBoard((prev) => !prev);
              }}
              className="boards_header"
            >
              {fullScreen && `All boards (${data.length})`}
              <ArrowDropDownIcon
                style={{
                  transform: `rotate(${angle}deg)`,
                  transition: "all 550ms ease-in-out",
                }}
              />
            </div>
          )}
          <div
            className="kanban_board_elements"
            ref={boardRef}
            style={{
              height: displayBoard ? boardRef.current?.scrollHeight : "0px",
              overflow: "hidden",
              transition: "height 0.5s ease-out",
            }}
          >
            {boards &&
              boards.map((board: Board) => (
                <div
                  className="kanban_element"
                  key={board.id}
                  onClick={() => navigate(`/kanban/${board.id!}`)}
                >
                  <div className="kanban_element_name_actions">
                    <p className="kanban_element_name">{board.name}</p>
                    {fullScreen && (
                      <div className="kanban_element_actions">
                        {displayDeleteButtons === board.id! ? (
                          <>
                            <Tooltip title="Delete">
                              <DoneIcon
                                className="kanbban_element_actions_approve"
                                onClick={() => handleDeleteBoard(board.id!)}
                              />
                            </Tooltip>
                            <Tooltip
                              title="Cancel"
                              onClick={() => setDisplayDeleteButtons(-1)}
                            >
                              <ClearIcon className="kanbban_element_actions_delete" />
                            </Tooltip>
                          </>
                        ) : editKanban === board.id! ? (
                          <>
                            <Tooltip title="Edit">
                              <DoneIcon
                                className="kanbban_element_actions_approve"
                                onClick={() => handleUpdateBoard(board.id!)}
                              />
                            </Tooltip>
                            <Tooltip
                              title="Cancel"
                              onClick={() => setEditKanban(-1)}
                            >
                              <ClearIcon className="kanbban_element_actions_delete" />
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Edit">
                              <EditIcon
                                className="kanbban_element_actions_edit"
                                onClick={() =>
                                  editKanban === -1
                                    ? setEditKanban(board.id!)
                                    : setEditKanban(-1)
                                }
                              />
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              onClick={() => setDisplayDeleteButtons(board.id!)}
                            >
                              <ClearIcon className="kanbban_element_actions_delete" />
                            </Tooltip>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {editKanban === board.id! && (
                    <div className="kaban_element_edit_input">
                      <input
                        value={updatedKanbanBoardName}
                        onChange={(e) =>
                          setUpdatedKanbanBoardName(e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="navbar_settings">
        <div className="navbar_settings_add_kanban">
          <div
            className="add_kanban"
            onClick={() => {
              dispatch(setFullscreen(true))
              setAddBoard((prev) => !prev);
            }}
          >
            <p>+</p>
            {fullScreen && <p>Add board</p>}
          </div>
          <div
            className="add_board"
            ref={containerRef}
            style={{
              height: addBoard ? "8.5rem" : "0px",
              overflow: "hidden",
              transition: "all 250ms ease-in-out",
            }}
          >
            <input
              type="text"
              className="add_board_input"
              value={kanbanName}
              onChange={(e) => setKanbanName(e.target.value)}
            />
            <div className="buttons">
              <NavbarAdd
                disabled={kanbanName === "" || error ? true : false}
                onClick={createKanban}
              >
                Add
              </NavbarAdd>
              <NavbarCancel onClick={cancelKanbanCreation}>Cancel</NavbarCancel>
            </div>
            {error && (
              <p style={{ color: "red" }}>{"Name of kanban must be < 20"}</p>
            )}
          </div>
        </div>
        <div
          className="hide_nav_bar"
          onClick={() => {
            setAddBoard(false);
            dispatch(setFullscreen(!fullScreen))
          }}
        >
          <p>
            {fullScreen ? <VisibilityOffIcon /> : <VisibilityIcon />}
            {fullScreen && "Hide Navbar"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
