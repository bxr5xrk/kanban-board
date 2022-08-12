export interface ITask {
    id: number;
    title: string;
}

export interface IBoard {
    id: number;
    title: string;
    tasks: ITask[];
}
