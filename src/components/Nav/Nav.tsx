import React, { useState } from "react";
import { kanbanDataProjects } from "../../.config";
import { IProject } from "../../types";
import Boards from "../Boards/Boards";

const Nav = () => {
    const [kanban] = useState<IProject[]>(kanbanDataProjects);
    const [selectedProject, setselectedProject] = useState<IProject>(kanban[0]);

    return (
        <>
            <nav className="nav">
                {kanban.map((i) => (
                    <button onClick={() => setselectedProject(i)} key={i.id}>
                        {i.projectName}
                    </button>
                ))}
            </nav>
            <main>
                <Boards selectedProject={selectedProject} />
            </main>
        </>
    );
};

export default Nav;
