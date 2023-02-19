import React from 'react';
import './KanbanCard.scss'
import {Draggable} from "react-beautiful-dnd";

interface Props {
    content: string;
    columnId: number;
    index: number;
    description: string;
    priority: string;
    assignedUser: string | undefined;
    setDisplayTask: React.Dispatch<React.SetStateAction<boolean>>;
    setClickedTask: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const KanbanCard: React.FC<Props> = (props) => {
    return (
        <Draggable
            key={props.columnId}
            draggableId={String(props.columnId)}
            index={props.index}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                        }}
                        className={`kanban_card ${snapshot.isDragging && "dragging"}`}
                        onClick={() => {
                            props.setClickedTask(props.columnId);
                            props.setDisplayTask(true);
                        }}
                    >
                        <div className={`kanban_card_priority ${props.priority === "HIGH" ? "high"
                            : props.priority === "MEDIUM" ? "medium"
                                : "low"}`}/>
                        <h2 className={"kanban_card_header"}>{props.content}</h2>
                        <p className={"kanban_card_descripotion"}>{props.description}</p>
                        <p className={"kanban_card_user"}>{props.assignedUser === null ? "Noone" : props.assignedUser}</p>
                    </div>
                );
            }}
        </Draggable>
    )
};

export default KanbanCard;