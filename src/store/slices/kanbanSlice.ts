import { IProject } from "./../../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface kanbanSliceState {
    kanbanData: IProject[];
}

const initialState: kanbanSliceState = {
    kanbanData: [],
};

const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        setKanbanData(state, action: PayloadAction<IProject[]>) {
            state.kanbanData = action.payload;
        },
    },
});

export const selectKanban = (state: RootState) => state.kanban;

export const { setKanbanData } = kanbanSlice.actions;

export default kanbanSlice.reducer;
