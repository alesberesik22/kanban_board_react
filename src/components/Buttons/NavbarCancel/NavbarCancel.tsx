import React from "react";
import "./NavbarCancel.scss";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const NavbarCancel: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <button {...rest} className="navbar_cancel_button">
      {children}
    </button>
  );
};

export default NavbarCancel;
