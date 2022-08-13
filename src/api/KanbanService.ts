import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { KANBAN_API } from "../.config";
import { IProject } from "../types";

export const fetchKanbanData = createAsyncThunk(
    "kanban/fetchKanbanData",
    async ({ id }: Pick<IProject, "id">) => {
        const idParam = id === 0 ? "" : `?id=1`;

        const { data } = await axios.get<IProject[]>(KANBAN_API + idParam);

        return data;
    }
);
