import React, { DragEvent, useState } from "react";

const kanban = [
    {
        id: 1,
        title: "one title",
        tasks: [
            { id: 1, title: "one task" },
            { id: 2, title: "two task" },
            { id: 3, title: "three task" },
            { id: 4, title: "four task" },
        ],
    },
    {
        id: 2,
        title: "two title",
        tasks: [
            { id: 5, title: "five task" },
            { id: 6, title: "six task" },
        ],
    },
    {
        id: 3,
        title: "three title",
        tasks: [
            { id: 7, title: "seven task" },
            { id: 8, title: "eight task" },
            { id: 9, title: "nine task" },
        ],
    },
];

interface ITask {
    id: number;
    title: string;
}

interface IBoard {
    id: number;
    title: string;
    tasks: ITask[];
}

function App() {
    const [data, setData] = useState<IBoard[]>(kanban);
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
    const [currentTask, setCurrentTask] = useState<ITask>();

    const dragLeaveHandler = (e: any) => {
        e.target.style.boxShadow = "none";
    };

    const dragEndHandler = (e: any) => {
        e.target.style.boxShadow = "none";
    };

    const dragStartHandler = (
        e: DragEvent<HTMLDivElement>,
        board: IBoard,
        task: ITask
    ) => {
        setCurrentBoard(board);
        setCurrentTask(task);
    };

    const dragOverHandler = (e: any) => {
        e.preventDefault();
        if (e.target.className === "task") {
            e.target.style.boxShadow = "0 10px 10px red";
        }
        // console.log(e.target.className);
    };

    const dropHandler = (
        e: DragEvent<HTMLDivElement>,
        board: IBoard,
        task: ITask
    ) => {
        e.preventDefault();
        const currentIndex = currentBoard?.tasks.indexOf(currentTask!) || 0;
        currentBoard?.tasks.splice(currentIndex, 1);
        const dropIndex = board?.tasks.indexOf(task);
        board.tasks.splice(dropIndex + 1, 0, currentTask!);

        setData(
            data.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard?.id) {
                    return currentBoard;
                }
                return b;
            })
        );
    };

    return (
        <div className="App">
            boards
            <div className="boards">
                {data.map((i) => (
                    <div key={i.id} className="board">
                        {i.title}
                        <div className="tasks">
                            {i.tasks.map((j) => (
                                <div
                                    className="task"
                                    draggable={true}
                                    key={j.id}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragStart={(e) =>
                                        dragStartHandler(e, board, task)
                                    }
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropHandler(e, board, task)}
                                >
                                    {j.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
