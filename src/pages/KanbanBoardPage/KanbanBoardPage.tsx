import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projectParams } = useParams<string>();

    const currentProjectId = kanbanData.find(
        (i) => i.projectName === projectParams
    );

    useEffect(() => {
        if (kanbanData.length < 2) {
            dispatch(fetchKanbanData({ id: 0 }));
        }

        if (kanbanData.length > 1 && currentProjectId !== undefined) {
            dispatch(setCurrentProject(currentProjectId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // check wrong projectParams
    if (kanbanData.length > 0 && currentProjectId === undefined) {
        return (
            <div>
                <h1>Такого проєкту не існує</h1>
                <button onClick={() => navigate("/")}>на головну</button>
            </div>
        );
    }

    return (
        <>
            <NavTmp />
            <BoardsTmp />
        </>
    );
};

export default KanbanBoardPage;
