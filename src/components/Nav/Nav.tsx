import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchKanbanData } from "../../api/KanbanService";
import { useFormat } from "../../hooks/useFormat";
import {
    selectKanban,
    setSelectedProject,
} from "../../store/slices/kanbanSlice";
import { useAppDispatch } from "../../store/store";
import { IProject } from "../../types";
import Boards from "../Boards/Boards";

const Nav = () => {
    const { projectParams } = useParams<string>();
    const { selectedProject, kanbanData } = useSelector(selectKanban);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const title = useFormat(
        selectedProject !== null ? selectedProject.projectName : "",
        "title"
    );

    useEffect(() => {
        const findItem = kanbanData.find(
            (i) => i.projectName === projectParams
        );
        if (kanbanData.length === 0) {
            dispatch(fetchKanbanData({ id: 0 }));
        }

        if (findItem !== undefined) {
            document.title = "Проєкт " + title;

            dispatch(setSelectedProject(findItem));
        }
        console.log(findItem, "-findItem");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectParams]);

    console.log(kanbanData, selectedProject, projectParams);

    if (selectedProject === null) {
        return (
            <div>
                <h1>Такого проєкту не існує</h1>
                <button onClick={() => navigate("/")}>на головну</button>
            </div>
        );
    }

    const onClickSelectProject = (i: IProject, path: string) => {
        if (i !== selectedProject) {
            dispatch(setSelectedProject(i));
            navigate("../kanban/project=" + path);
        }
    };

    return (
        <>
            <nav className="nav">
                {kanbanData.map((i) => (
                    <button
                        onClick={() => onClickSelectProject(i, i.projectName)}
                        key={i.id}
                    >
                        {i.projectName}
                    </button>
                ))}
            </nav>

            <Boards selectedProject={selectedProject} />

            <button onClick={() => navigate("/")}>на головну</button>
        </>
    );
};

export default Nav;
