import React, {useEffect} from 'react';
import {useUpdateBoardMutation} from "../../api/boardApi";
import {Column} from "../../interfaces/ApiTypes";

const useUpdateColumns = (changedColumnTasks: boolean, id: number, columns: Column[],
                          kanbanName: string, kanbanDescription: string,
                          setChangedColumnTasks: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [updateBoard] = useUpdateBoardMutation();

    useEffect(() => {
        if (changedColumnTasks) {
            updateBoard({
                id: id, columns: columns,
                name: kanbanName, description: kanbanDescription
            })
            setChangedColumnTasks(false);
        }
    }, [changedColumnTasks])
};

export default useUpdateColumns;
