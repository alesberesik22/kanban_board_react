import React, {useEffect, useState} from 'react';
import {Column} from "../../interfaces/ApiTypes";

const UseMaxSequence = (array: Column[], columNumber: number) => {
    const [result, setResult] = useState<number>();

    useEffect(() => {
        const column = array?.slice().find((column) => column.id === columNumber);
        if (column?.tasks?.length === 0 || column?.tasks === undefined) {
            setResult(1);
        } else {
            setResult(Math.max(...column?.tasks?.map(task => task?.sequence)!) + 1);
        }
    }, [array,columNumber])
    return result;
}

export default UseMaxSequence;