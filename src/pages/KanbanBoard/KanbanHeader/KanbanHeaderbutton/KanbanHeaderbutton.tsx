import React from "react";
import "./KanbanHeaderbutton.scss";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const KanbanHeaderbutton: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <button {...rest} className="kanban_header_button">
      {children}
    </button>
  );
};

export default KanbanHeaderbutton;
