import { IProject } from "./../../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchKanbanData } from "../../api/KanbanService";

interface kanbanSliceState {
    kanbanData: IProject[];
    status: "loading" | "success" | "rejected";
    selectedProject: IProject | null;
}

const initialState: kanbanSliceState = {
    kanbanData: [],
    status: "loading",
    selectedProject: null,
};

const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        setKanbanData(state, action: PayloadAction<IProject[]>) {
            state.kanbanData = action.payload;
        },
        setSelectedProject(state, action: PayloadAction<IProject>) {
            state.selectedProject = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchKanbanData.pending, (state) => {
            state.status = "loading";
            state.kanbanData = [];
        });
        builder.addCase(
            fetchKanbanData.fulfilled,
            (state, action: PayloadAction<IProject[]>) => {
                state.status = "success";
                state.kanbanData = action.payload;
            }
        );
        builder.addCase(fetchKanbanData.rejected, (state) => {
            state.status = "rejected";
            state.kanbanData = [];
        });
    },
});

export const selectKanban = (state: RootState) => state.kanban;

export const { setKanbanData, setSelectedProject } = kanbanSlice.actions;

export default kanbanSlice.reducer;
