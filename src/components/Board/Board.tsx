import React, { DragEvent, FC, useRef } from "react";
import { kanbanData } from "../../.config";
import { IBoard, ITask } from "../../types";
import Task from "../Task/Task";

interface BoardProps {
    board: IBoard;
    setKanban: (kanban: IBoard[]) => void;
    currentTask: ITask | null;
    setCurrentTask: (task: ITask) => void;
    currentBoard: IBoard | null;
    setCurrentBoard: (board: IBoard) => void;
}

const Board: FC<BoardProps> = ({
    board,
    setKanban,
    currentTask,
    setCurrentTask,
    currentBoard,
    setCurrentBoard,
}) => {
    const currentBoardRef = useRef<HTMLDivElement>(null);
    const tasksRef = useRef<HTMLDivElement>(null);

    // start
    const dragStartHandler = (
        e: DragEvent<HTMLDivElement>,
        board: IBoard,
        task: ITask
    ) => {
        setCurrentBoard(board);
        setCurrentTask(task);

        const target = e.target as HTMLDivElement;
        target.className = "task active";
    };

    // over
    const dragOverHandler = (e: DragEvent<HTMLDivElement>, task: ITask) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;

        target.className = "task overTask";
    };

    const dragOverBoardHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (currentBoardRef.current !== null) {
            currentBoardRef.current.className = "board active";
        }
    };

    // end
    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        target.className = "task";

        console.log(currentBoard?.id, currentTask?.id);
    };

    // leave
    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        target.className = "task";
    };

    const dragLeaveBoardHandler = (e: DragEvent<HTMLDivElement>) => {
        if (currentBoardRef.current !== null) {
            currentBoardRef.current.className = "board";
        }
    };

    // drop
    const dropHandler = (
        e: DragEvent<HTMLDivElement>,
        board: IBoard,
        task: ITask
    ) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        target.className = "task";

        if (currentTask !== null && currentBoard !== null) {
            const currentTaskIndex = currentBoard.tasks.indexOf(currentTask);
            currentBoard.tasks.splice(currentTaskIndex, 1);
            const higherItemIndex = board.tasks.indexOf(task);
            board.tasks.splice(higherItemIndex + 1, 0, currentTask);
            setKanban(
                kanbanData.map((i) => {
                    if (i.id === board.id) {
                        return board;
                    }
                    if (i.id === currentBoard.id) {
                        return currentBoard;
                    }
                    return i;
                })
            );
        }
    };

    const dropBoardHandler = (e: DragEvent<HTMLDivElement>, i: IBoard) => {
        if (currentTask !== null && currentBoard !== null) {
            const findItem = i.tasks.find((i) => i.id === currentTask.id);

            if (!findItem) {
                i.tasks.push(currentTask);
                const currentIndex = currentBoard.tasks.indexOf(currentTask);
                currentBoard.tasks.splice(currentIndex, 1);

                setKanban(
                    kanbanData.map((b) => {
                        if (b.id === i.id) {
                            return i;
                        }
                        if (b.id === currentBoard?.id) {
                            return currentBoard;
                        }
                        return b;
                    })
                );
            }
        }
    };

    return (
        <div
            ref={currentBoardRef}
            key={board.id}
            className="board"
            onDragOver={(e) => dragOverBoardHandler(e)}
            onDragLeave={(e) => dragLeaveBoardHandler(e)}
            onDrop={(e) => dropBoardHandler(e, board)}
        >
            <h3>{board.title}</h3>
            <div className="tasks" ref={tasksRef}>
                {board.tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        board={board}
                        dragEndHandler={dragEndHandler}
                        dragOverHandler={dragOverHandler}
                        dragStartHandler={dragStartHandler}
                        dropHandler={dropHandler}
                        dragLeaveHandler={dragLeaveHandler}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
