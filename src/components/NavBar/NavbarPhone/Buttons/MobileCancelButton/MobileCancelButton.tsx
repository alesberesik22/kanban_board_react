import React from 'react';
import './MobileCancelButton.scss'

export interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
        React.AriaAttributes {}

const MobileCancelButton: React.FC<ButtonProps> = (props) => {
    const {children, ...rest} = props;

    return (
        <button {...rest} className="mobile_cancel_button">
            {children}
        </button>
    );
}

export default MobileCancelButton;
