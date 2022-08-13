import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchKanbanData } from "../../api/KanbanService";
import { selectKanban } from "../../store/slices/kanbanSlice";
import { useAppDispatch } from "../../store/store";

const HomePage = () => {
    const { kanbanData } = useSelector(selectKanban);
    const dispatch = useAppDispatch();

    document.title = "Kanban App";

    useEffect(() => {
        if (kanbanData.length === 0) {
            dispatch(fetchKanbanData({ id: 1 }));
        }
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {kanbanData.length > 0 && (
                <Link to={`kanban/project=${kanbanData[0].projectName}`}>
                    kanban
                </Link>
            )}
        </div>
    );
};

export default HomePage;
