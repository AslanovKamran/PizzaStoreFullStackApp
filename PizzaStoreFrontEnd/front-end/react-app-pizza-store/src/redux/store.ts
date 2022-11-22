import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filter/slice";
import searcSlice from "./slices/search/slice";
import cartSlice from "./slices/cart/slice";
import pizzaSlice from "./slices/pizza/slice";
import userSlice from "./slices/user/slice";

import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: { filter:filterSlice, search:searcSlice, cart:cartSlice, pizza:pizzaSlice, user:userSlice }
});

export type RootState = ReturnType <typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch= ()=>useDispatch<AppDispatch>();