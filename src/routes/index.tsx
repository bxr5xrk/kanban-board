import { Navigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import HomePage from "../pages/HomePage/HomePage";
import Page404 from "../pages/Page404/Page404";

export const routes = [
    { path: "/", element: <HomePage /> },
    { path: "kanban/project=:projectParams", element: <Nav /> },
    { path: "*", element: <Page404 /> },
    { path: "kanban", element: <Navigate to="/" replace /> },
];
