import React, { DragEvent, FC } from "react";
import { IBoard, ITask } from "../../types";

interface TaskProps {
    task: ITask;
    board: IBoard;
    dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void;
    dragEndHandler: (e: DragEvent<HTMLDivElement>) => void;
    dragStartHandler: (
        e: DragEvent<HTMLDivElement>,
        board: IBoard,
        task: ITask
    ) => void;
    dragOverHandler: (e: DragEvent<HTMLDivElement>, task: ITask) => void;
    dropHandler: (
        e: DragEvent<HTMLDivElement>,
        board: IBoard,
        task: ITask
    ) => void;
}

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
