import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IFetchPizzasArgs, IPizzaItem, IPizzaSliceState } from "./types";


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: IFetchPizzasArgs) => {
    const { currentPage, order, sortBy, category } = params;
    const response = await axios.get<IPizzaItem[]>(`http://localhost:13063/api/Pizza?${category}&sortBy=${sortBy}&orderBy=${order}&page=${currentPage}`);
    return response.data;
});

export enum StatusList {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAIL = 'fail'
}

const initialState: IPizzaSliceState = {
    items: [],
    pageInfo: { totalPages: 1, itemsPerPage: 4 },
    status: StatusList.PENDING
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState: initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, state => {
            state.items = [];
            state.pageInfo = { totalPages: 1, itemsPerPage: 8 };
            state.status = StatusList.PENDING
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            //@ts-ignore
            state.items = action.payload.pizzas;
            //@ts-ignore
            state.pageInfo = action.payload.pageInfo;
            state.status = StatusList.SUCCESS
        });

        builder.addCase(fetchPizzas.rejected, state => {
            state.items = [];
            state.status = StatusList.FAIL;
            state.pageInfo = { totalPages: 1, itemsPerPage: 8 };
        });

    }
}
);

export default pizzaSlice.reducer;