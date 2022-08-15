import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchKanbanData } from "../../api/KanbanService";
import BoardsTmp from "../../components/Boards/BoardsTmp";
import NavTmp from "../../components/Nav/NavTmp";
import {
    selectKanban,
    setCurrentProject,
} from "../../store/slices/kanbanSlice";
import { useAppDispatch } from "../../store/store";

const KanbanBoardPage: FC = () => {
    const { kanbanData } = useSelector(selectKanban);
    const dispatch = useAppDispatch();
    const { projectParams } = useParams<string>();

    useEffect(() => {
        dispatch(fetchKanbanData({ id: 0 }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (kanbanData.length > 1) {
            const currentProjectId = kanbanData.find(
                (i) => i.projectName === projectParams
            );
            if (currentProjectId !== undefined) {
                dispatch(setCurrentProject(currentProjectId));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kanbanData]);

    return (
        <>
            <NavTmp />
            <BoardsTmp />
        </>
    );
};

export default KanbanBoardPage;
