import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import KanbanBoardPage from "../pages/KanbanBoardPage/KanbanBoardPage";
import Page404 from "../pages/Page404/Page404";

export const routes = [
    { path: "/", element: <HomePage /> },
    { path: "kanban/project=:projectParams", element: <KanbanBoardPage /> },
    { path: "*", element: <Page404 /> },
    { path: "kanban", element: <Navigate to="/" replace /> },
];
