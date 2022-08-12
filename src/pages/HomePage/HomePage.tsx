import React, { useState } from "react";
import { Link } from "react-router-dom";
import { kanbanDataProjects } from "../../.config";
import { IProject } from "../../types";

const HomePage = () => {
    const [kanban] = useState<IProject[]>(kanbanDataProjects);

    return (
        <div>
            <h1>Home</h1>
            <Link to={`kanban/${kanban[0].projectName}`}>kanban</Link>
        </div>
    );
};

export default HomePage;
