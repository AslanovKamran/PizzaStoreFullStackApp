import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import paginationSlice from "./slices/paginationSlice";


export const store = configureStore({
    reducer: {paginationSlice:paginationSlice, adminSlice:adminSlice }
});
