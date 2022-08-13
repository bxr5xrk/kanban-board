import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { kanbanDataProjects } from "../../.config";
import { selectKanban, setKanbanData } from "../../store/slices/kanbanSlice";
import { useAppDispatch } from "../../store/store";
import { IProject } from "../../types";

const HomePage = () => {
    const [kanban] = useState<IProject[]>(kanbanDataProjects);
    const { kanbanData } = useSelector(selectKanban);
    const dispatch = useAppDispatch();

    document.title = "Kanban App";

    useEffect(() => {
        dispatch(setKanbanData(kanban));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <Link to={`kanban/project=${kanban[0].projectName}`}>kanban</Link>
        </div>
    );
};

export default HomePage;
