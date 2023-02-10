import React from "react";
import "./CancelColumn.scss";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const CancelColumn: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <button {...rest} className="cancel_column_modal_button">
      {children}
    </button>
  );
};

export default CancelColumn;
