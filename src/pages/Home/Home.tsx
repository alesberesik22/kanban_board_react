import React, {useEffect} from "react";
import "./Home.scss";
import {useGetBoardsQuery} from "../../api/boardApi";
import {Board} from "../../interfaces/ApiTypes";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import HomeColumns from "./HomeColumns/HomeColumns";

const Home = () => {
    const navigate = useNavigate();
    const {data, refetch} = useGetBoardsQuery(null);
    const fullScreen = useSelector((state: any) => state.reduxStoreSlice.fullscreen);

    useEffect(() => {
        refetch();
    }, [])

    return <div className={`home ${fullScreen ? "home_full_width" : 'home_full_width_small-width'}`}>
        {data && (
            data.map((board: Board) => (
                <div className={"home_boards"} onClick={()=>navigate(`/kanban/${board.id}`)}>
                    <h2 className={"home_boards_name"}>{board.name}</h2>
                    <HomeColumns board={board}/>
                </div>
            ))
        )}
    </div>;
};

export default Home;
