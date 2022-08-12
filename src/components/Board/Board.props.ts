import { IBoard, ITask } from "../../types";

export interface BoardProps {
    board: IBoard;
    setKanban: (kanban: IBoard[]) => void;
    currentTask: ITask | null;
    setCurrentTask: (task: ITask) => void;
    currentBoard: IBoard | null;
    setCurrentBoard: (board: IBoard) => void;
}
