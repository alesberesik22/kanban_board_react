import React from 'react';
import './KanbanCard.scss'
import {Draggable} from "react-beautiful-dnd";

interface Props {
    content:string;
    columnId:number;
    index:number;
}

const KanbanCard:React.FC<Props> = (props) => (
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
                >
                    {props.content}
                </div>
            );
        }}
    </Draggable>
);

export default KanbanCard;