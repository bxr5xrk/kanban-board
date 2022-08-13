import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { kanbanDataProjects } from "../../.config";
import { IProject } from "../../types";
import Boards from "../Boards/Boards";

const Nav = () => {
    const [kanban] = useState<IProject[]>(kanbanDataProjects);
    const { projectParams } = useParams<string>();
    const findItem = kanban.find((i) => i.projectName === projectParams);
    const [selectedProject, setSelectedProject] = useState<IProject>(findItem!);
    const navigate = useNavigate();

    const onClickSelectProject = (i: IProject, path: string) => {
        if (i !== selectedProject) {
            setSelectedProject(i);
            navigate("../kanban/project=" + path);
        }
    };

    useEffect(() => {
        if (findItem !== undefined) {
            document.title =
                "Проєкт " +
                selectedProject.projectName[0].toUpperCase() +
                selectedProject.projectName.slice(1).replace("-", " ");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectParams]);

    if (findItem === undefined) {
        return (
            <div>
                <h1>Такого проєкту не існує</h1>
                <button onClick={() => navigate("/")}>на головну</button>
            </div>
        );
    }

    return (
        <>
            <nav className="nav">
                {kanban.map((i) => (
                    <button
                        onClick={() => onClickSelectProject(i, i.projectName)}
                        key={i.id}
                    >
                        {i.projectName}
                    </button>
                ))}
            </nav>
            <main>
                <Boards selectedProject={selectedProject} />
            </main>
            <button onClick={() => navigate("/")}>на головну</button>
        </>
    );
};

export default Nav;
