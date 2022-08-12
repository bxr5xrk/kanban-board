import { FC } from "react";
import { TaskProps } from "./Task.props";

const Task: FC<TaskProps> = ({
    task,
    board,
    dragLeaveHandler,
    dragEndHandler,
    dragStartHandler,
    dragOverHandler,
    dropHandler,
}) => {
    return (
        <div
            className="task"
            draggable={true}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, task)}
            onDragOver={(e) => dragOverHandler(e, task)}
            onDrop={(e) => dropHandler(e, board, task)}
        >
            {task.title}
        </div>
    );
};

export default Task;
