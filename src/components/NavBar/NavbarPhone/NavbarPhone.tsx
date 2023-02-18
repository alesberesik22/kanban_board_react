import React, {useRef, useState} from "react";
import "./NavbarPhone.scss";
import {useTransition, animated} from "react-spring";
import {Twirl as Hamburger} from "hamburger-react";
import logo from "../../../assets/images/logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {Board} from "../../../interfaces/ApiTypes";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import {
    useAddBoardMutation,
    useDeleteBoardMutation,
    useUpdateBoardNameMutation,
} from "../../../api/boardApi";
import {useDispatch} from "react-redux";
import {setRefetch} from "../../../redux/slices/ReduxStoreSlice";
import MobileAddButton from "./Buttons/MobileAddButton/MobileAddButton";
import MobileCancelButton from "./Buttons/MobileCancelButton/MobileCancelButton";
import {useNavigate} from "react-router-dom";
import kodiva from '../../../assets/images/kodiva_logo_white.png'

interface props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    boards: Board[] | undefined;
}

const NavbarPhone: React.FC<props> = ({open, setOpen, boards}) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState(0);
    const [displayBoards, setDisplayBoards] = useState(true);
    const [editDelete, setEditDelete] = useState<string>("");
    const [editDeleteId, setEditDeleteId] = useState<number>();
    const [newKanbanName, setNewKanbanName] = useState("");
    const [newBoard, setNewBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");

    const [deleteBoardMutation] = useDeleteBoardMutation();
    const [updateBoardName] = useUpdateBoardNameMutation();
    const [updateBoardMutation] = useAddBoardMutation()

    const dispatch = useDispatch();

    const transition = useTransition(open, {
        from: {x: -800, opacity: 0},
        enter: {x: 0, opacity: 1},
        leave: {x: -800, opacity: 0},
    });

    const handleDelete = () => {
        console.log(editDeleteId);
        deleteBoardMutation(editDeleteId!);
        dispatch(setRefetch(true))
    };
    const handleEdit = () => {
        if (newKanbanName !== "") {
            updateBoardName({id: editDeleteId, name: newKanbanName});
            dispatch(setRefetch(true));
            setEditDelete("");
            setEditDeleteId(-1);
        }
    };
    const handleAddBoard = () => {
        if (newBoardName !== "") {
            updateBoardMutation({name: newBoardName});
            dispatch(setRefetch(true));
            setNewBoardName("");
        }
    }

    return (
        <>
            {transition((style, item) =>
                item ? (
                    <animated.div style={style} className={"navbar_phone"}>
                        <div className={"navbar_phone_logo"}>
                            <Hamburger toggled={open} toggle={setOpen}/>
                            <div className={"navbar_phone_image"}>
                                <img src={kodiva} alt={"Kanban board"}/>
                            </div>
                            <h2>Kodiva kanban</h2>
                        </div>
                        <div className={"navbar_phone_content"}>
                            <div className={"navbar_phone_content_boards"}>
                                <div className={"phone_kodiva_redirect"}
                                     onClick={() => window.open("https://apps.kodiva.sk/", "_blank")}>
                                    <a>Kodiva APPS</a>
                                    <img src={kodiva} alt={"kodiva_apps"}/>
                                </div>
                                <div
                                    className={"navbar_phone_content_boards_display"}
                                    onClick={() => {
                                        setAngle((prev) => prev + 180);
                                        setDisplayBoards((prev) => !prev);
                                    }}
                                >
                                    <p className="navbar_phone_content_boards_display_text">
                                        Display boards
                                    </p>
                                    <ArrowDropDownIcon
                                        style={{
                                            transition: "all 250ms ease-in-out",
                                            rotate: `${angle}deg`,
                                            color: "black",
                                        }}
                                    />
                                </div>
                                <div className="navbar_phone_content_boards_elements">
                                    {displayBoards &&
                                        boards &&
                                        boards
                                            .slice()
                                            .sort((a, b) => (a.id! > b.id! ? 1 : -1))
                                            .map((board) => (
                                                <div
                                                    className="navbar_phone_content_boards_element"
                                                    key={board.id!}
                                                >
                                                    <div className="navbar_phone_content_boards_element_body">
                                                        <div className="navbar_phone_content_boards_element_text"
                                                             onClick={() => {
                                                                 navigate(`/kanban/${board.id}`);
                                                                 setOpen(false)
                                                             }
                                                             }>
                                                            {board.name}
                                                        </div>
                                                        <div className="navbar_phone_content_boards_element_actions">
                                                            <div className={"navbar_phone_content_add_board"}>
                                                                {editDelete === "EDIT" &&
                                                                editDeleteId === board.id! ? (
                                                                    <>
                                                                        <DoneIcon
                                                                            className="edit_icon"
                                                                            onClick={handleEdit}
                                                                        />
                                                                        <ClearIcon
                                                                            className="delete_icon"
                                                                            onClick={() => {
                                                                                setEditDelete("");
                                                                                setEditDeleteId(-1);
                                                                            }}
                                                                        />
                                                                    </>
                                                                ) : editDelete === "DELETE" &&
                                                                editDeleteId === board.id! ? (
                                                                    <>
                                                                        <DoneIcon
                                                                            className="edit_icon"
                                                                            onClick={handleDelete}
                                                                        />
                                                                        <ClearIcon
                                                                            className="delete_icon"
                                                                            onClick={() => {
                                                                                setEditDelete("");
                                                                                setEditDeleteId(-1);
                                                                            }}
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <EditIcon
                                                                            className="edit_icon"
                                                                            onClick={() => {
                                                                                setEditDeleteId(board.id!);
                                                                                setEditDelete("EDIT");
                                                                            }}
                                                                        />
                                                                        <ClearIcon
                                                                            className="delete_icon"
                                                                            onClick={() => {
                                                                                setEditDeleteId(board.id!);
                                                                                setEditDelete("DELETE");
                                                                            }}
                                                                        />
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {editDelete === "EDIT" &&
                                                    editDeleteId === board.id! ? (
                                                        <input
                                                            type={"text"}
                                                            value={newKanbanName}
                                                            onChange={(e) => setNewKanbanName(e.target.value)}
                                                        />
                                                    ) : null}
                                                </div>
                                            ))}
                                </div>
                            </div>
                            <div className={"navbar_phone_add_board"}>
                                <h3 onClick={() => setNewBoard(prev => !prev)}>+ Add board</h3>
                                <div className={"add_board_phone"} ref={containerRef}
                                     style={{
                                         height: newBoard ? "8.5rem" : "0px",
                                         overflow: "hidden",
                                         transition: "all 250ms ease-in-out",
                                     }}>
                                    <input value={newBoardName} onChange={(e) => setNewBoardName(e.target.value)}/>
                                    <div className={"add_board_phone_buttons"}>
                                        <MobileAddButton onClick={handleAddBoard}>Add board</MobileAddButton>
                                        <MobileCancelButton
                                            onClick={() => setNewBoard(false)}>Cancel</MobileCancelButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                ) : null
            )}
        </>
    );
};

export default NavbarPhone;
