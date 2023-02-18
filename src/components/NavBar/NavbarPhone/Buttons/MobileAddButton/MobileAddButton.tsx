import React from 'react';
import './MobileAddButton.scss'

export interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
        React.AriaAttributes {}

const MobileAddButton: React.FC<ButtonProps> = (props) => {
    const {children, ...rest} = props;

    return (
        <button {...rest} className="mobile_add_button">
            {children}
        </button>
    );
}

export default MobileAddButton;
