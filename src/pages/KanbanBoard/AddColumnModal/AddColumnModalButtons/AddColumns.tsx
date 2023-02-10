import React from "react";
import "./AddColumn.scss";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const AddColumns: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <button {...rest} className="add_column_modal_button">
      {children}
    </button>
  );
};

export default AddColumns;
