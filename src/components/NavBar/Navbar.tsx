import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/images/logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavbarAdd from "../Buttons/NavbarAdd/NavbarAdd";
import NavbarCancel from "../Buttons/NavbarCancel/NavbarCancel";
import { useAddBoardMutation, useGetBoardsQuery } from "../../api/boardApi";
import { Board } from "../../interfaces/ApiTypes";

const Navbar = () => {
  const { data, isSuccess } = useGetBoardsQuery(null);
  const [addKanbanBoard] = useAddBoardMutation();
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [angle, setAngle] = useState(0);
  const [addBoard, setAddBoard] = useState(false);
  const [hideNavBar, setHideNavBar] = useState(false);
  const [kanbanName, setKanbanName] = useState("");
  const [error, setError] = useState(false);

  const createKanban = () => {
    addKanbanBoard({ name: kanbanName });
  };

  const cancelKanbanCreation = () => {
    setKanbanName("");
    setAddBoard(false);
  };

  useEffect(() => {
    kanbanName.length > 20 ? setError(true) : setError(false);
  }, [kanbanName]);

  return (
    <div className={`navbar ${!hideNavBar ? "full-width" : "small-width"}`}>
      <div className="navbar_container">
        <div className="logo">
          <img src={logo} alt="logo" className="logo_img" />
          {!hideNavBar && <h2>Kanban app</h2>}
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
              {!hideNavBar && `All boards (${data.length})`}
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
            {data &&
              data.map((board: Board) => (
                <div className="kanban_element" key={board.id}>
                  <p>{board.name}</p>
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
              setHideNavBar(false);
              setAddBoard((prev) => !prev);
            }}
          >
            <p>+</p>
            {!hideNavBar && <p>Add board</p>}
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
            setHideNavBar((prev) => !prev);
          }}
        >
          <p>
            {!hideNavBar ? <VisibilityOffIcon /> : <VisibilityIcon />}
            {!hideNavBar && "Hide Navbar"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
