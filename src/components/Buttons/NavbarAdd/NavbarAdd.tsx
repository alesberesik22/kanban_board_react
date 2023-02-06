import React from "react";
import "./NavbarAdd.scss";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const NavbarAdd: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <button {...rest} className="navbar_add_button">
      {children}
    </button>
  );
};

export default NavbarAdd;
