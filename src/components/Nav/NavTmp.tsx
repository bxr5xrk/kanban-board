import axios from "axios";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { KANBAN_API } from "../../.config";
import { fetchKanbanData } from "../../api/KanbanService";
import {
    selectKanban,
    setCurrentProject,
} from "../../store/slices/kanbanSlice";
import { useAppDispatch } from "../../store/store";
import { IProject } from "../../types";

const fetchNewProject = async (data: string) => {
    const obj = {
        projectName: data,
        boards: [
            {
                id: 1,
                title: "oneone title",
                tasks: [],
            },
            {
                id: 2,
                title: "twotwo title",
                tasks: [],
            },
            {
                id: 3,
                title: "threethree title",
                tasks: [],
            },
        ],
    };

    await axios.post(KANBAN_API, {
        ...obj,
    });
};

const NavTmp: FC = () => {
    const { kanbanData, currentProject } = useSelector(selectKanban);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            console.log(value);
            setShowInput(false);
            setValue("");
            fetchNewProject(value);
        }
    };

    const onClickSelectProject = (i: IProject, path: string) => {
        if (i !== currentProject) {
            dispatch(setCurrentProject(i));
            navigate("../kanban/project=" + path);
        }
    };

    console.log(currentProject);

    return (
        <>
            <nav className="nav">
                {kanbanData.map((i) => (
                    <button
                        className={
                            currentProject?.projectName === i.projectName
                                ? "colorRed"
                                : ""
                        }
                        onClick={() => onClickSelectProject(i, i.projectName)}
                        key={i.id}
                    >
                        {i.projectName}
                    </button>
                ))}
                {!showInput && (
                    <button onClick={() => setShowInput(true)}>
                        new project
                    </button>
                )}

                {showInput && (
                    <input
                        autoFocus
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                )}
            </nav>

            <button onClick={() => navigate("/")}>на головну</button>
        </>
    );
};

export default NavTmp;
