import { FC } from "react";
import { useSelector } from "react-redux";
import { selectKanban } from "../../store/slices/kanbanSlice";

const BoardsTmp: FC = () => {
    const { currentProject } = useSelector(selectKanban);

    return (
        <div>
            <h1>{currentProject?.projectName}</h1>
        </div>
    );
};

export default BoardsTmp;
