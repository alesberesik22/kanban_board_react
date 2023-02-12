import React from 'react';
import './CancelTask.scss'

export interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
        React.AriaAttributes {}

const CancelTask: React.FC<ButtonProps> = (props) => {
    const { children, ...rest } = props;

    return (
        <button {...rest} className="cancel_task_button">
            {children}
        </button>
    );
};

export default CancelTask;
