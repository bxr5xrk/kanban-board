import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import kanbanSlice from "./slices/kanbanSlice";

export const store = configureStore({
    reducer: {
        kanban: kanbanSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
