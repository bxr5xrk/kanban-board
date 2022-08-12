import { DragEvent } from "react";
import { IBoard, ITask } from "../../types";

export interface TaskProps {
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
