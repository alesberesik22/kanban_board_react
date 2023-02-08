import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const itemsFromBackend = [
  {
    id: 0,
    content: "First task",
  },
  {
    id: 1,
    content: "Second task",
  },
];

const columnsFromBackend = [
  {
    name: "Todo",
    items: itemsFromBackend,
    id: 0,
  },
];

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="kanban_content">
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightcyan"
                        : "lightgrey",
                      padding: 4,
                      width: 250,
                      minHeight: 500,
                    }}
                  >
                    {column.items.map((tasks, index) => (
                      <Draggable
                        key={tasks.id}
                        draggableId={String(tasks.id)}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: 16,
                                margin: "0 0 8px 0",
                                minHeight: "50px",
                                backgroundColor: snapshot.isDragging
                                  ? "#263B4A"
                                  : "#456C86",
                                color: "white",
                                ...provided.draggableProps.style,
                              }}
                            >
                              {tasks.content}
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
};

// @ts-ignore
export default Kanban;
