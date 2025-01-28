import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./recipesSlice";

const store = configureStore({
    reducer: recipesSlice.reducer
});

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch; 

export default store