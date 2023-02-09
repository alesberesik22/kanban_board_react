import React, { useState } from "react";
import "./Kanban.scss";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface ColumnType {
  name: string;
  id: number;
  items: itemsType[];
}
interface itemsType {
  id: number;
  content: string;
}

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
  {
    name: "Second",
    items: [],
    id: 1,
  },
];

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[Number(source.droppableId)];
      const destColumn = columns[Number(destination.droppableId)];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((column: any, index: number) => {
          if (column.id === Number(source.droppableId)) {
            return {
              ...column,
              items: sourceItems,
            };
          }
          if (column.id === Number(destination.droppableId)) {
            return {
              ...column,
              items: destItems,
            };
          }
          return column;
        })
      );
    } else {
      const column = columns[Number(source.droppableId)];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((columnElement: any) => {
          if (columnElement.id === Number(source.droppableId)) {
            return {
              ...columnElement,
              items: copiedItems,
            };
          }
          return columnElement;
        })
      );
    }
  };

  return (
    <div className="kanban_content">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {columns &&
          columns.map((column, id) => {
            return (
              <div className="kanban_content_column" key={id}>
                <h2>{column.name}</h2>
                <Droppable droppableId={String(id)} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="kanban_content_column_tasks"
                      >
                        {column.items.map((tasks: itemsType, index: number) => (
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
              </div>
            );
          })}
      </DragDropContext>
    </div>
  );
};

// @ts-ignore
export default Kanban;
