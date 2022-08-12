import React, { FC, useState } from "react";
import { kanbanData } from "../../.config";
import { IBoard, ITask } from "../../types";
import Board from "../Board/Board";

const Boards: FC = () => {
    const [kanban, setKanban] = useState<IBoard[]>(kanbanData);
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
    const [currentTask, setCurrentTask] = useState<ITask | null>(null);

    return (
        <main className="kanban">
            <h1>title</h1>

            <div className="boards">
                {kanban.map((board) => (
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
