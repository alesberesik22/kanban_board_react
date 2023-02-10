import React from "react";
import "./KanbanHeader.scss";
import KanbanHeaderbutton from "./KanbanHeaderbutton/KanbanHeaderbutton";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  setDisplayAddColumnKanban: React.Dispatch<React.SetStateAction<boolean>>;
}

const KanbanHeader: React.FC<Props> = (props) => {
  return (
    <div className="kanban_header_content_container_header">
      <KanbanHeaderbutton
        onClick={() => props.setDisplayAddColumnKanban((prev) => !prev)}
      >
        <AddIcon />
        <div> Add Column</div>
      </KanbanHeaderbutton>
    </div>
  );
};

export default KanbanHeader;
