import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectKanban } from "../../store/slices/kanbanSlice";

const BoardsTmp: FC = () => {
    const { currentProject } = useSelector(selectKanban);
    const { kanbanData } = useSelector(selectKanban);
    const navigate = useNavigate();

    // check wrong projectParams
    if (kanbanData.length > 0 && currentProject === null) {
        return (
            <div>
                <h1>Такого проєкту не існує</h1>
                <button onClick={() => navigate("/")}>на головну</button>
            </div>
        );
    }

    return (
        <main>
            <h1>{currentProject?.projectName}</h1>
        </main>
    );
};

export default BoardsTmp;
