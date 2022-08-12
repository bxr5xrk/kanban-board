import { FC, useState } from "react";
import { kanbanData } from "../../.config";
import { IBoard, IProject, ITask } from "../../types";
import Board from "../Board/Board";

interface BoardsProps {
    selectedProject: IProject;
}

const Boards: FC<BoardsProps> = ({ selectedProject }) => {
    const [kanban, setKanban] = useState<IBoard[]>(kanbanData);
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
    const [currentTask, setCurrentTask] = useState<ITask | null>(null);

    return (
        <main className="kanban">
            <h1>{selectedProject.projectName}</h1>

            <div className="boards">
                {selectedProject.boards.map((board) => (
                    <Board
                        key={board.id}
                        board={board}
                        setKanban={setKanban}
                        currentBoard={currentBoard}
                        setCurrentBoard={setCurrentBoard}
                        currentTask={currentTask}
                        setCurrentTask={setCurrentTask}
                    />
                ))}
            </div>
        </main>
    );
};

export default Boards;
