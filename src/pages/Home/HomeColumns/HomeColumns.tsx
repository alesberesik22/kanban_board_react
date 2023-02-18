import React from 'react';
import './HomeColumns.scss'
import {Board} from "../../../interfaces/ApiTypes";
import HomeColumnTask from "./HomeColumnTask/HomeColumnTask";

interface props {
    board:Board;
}

const HomeColumns:React.FC<props> = ({board}) => {
    return (
        <div className={"home_boards_body"}>
            {board.columns?.map((column) => (
                <div className={"home_boards_body_columns"} key={column.id}>
                    <h4>{column.name}</h4>
                    <HomeColumnTask tasks={column.tasks!}/>
                </div>
            ))}
        </div>
    );
};

export default HomeColumns;
