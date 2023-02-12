import React from 'react';
import './UpdateTask.scss'

export interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
        React.AriaAttributes {}

const UpdateTask: React.FC<ButtonProps> = (props) => {
    const { children, ...rest } = props;

    return (
        <button {...rest} className="update_task_button">
            {children}
        </button>
    );
};

export default UpdateTask;
