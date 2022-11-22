import { createSlice } from "@reduxjs/toolkit";
import calcTotalPrice from "../../../utils/calcTotalPrice";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { ICartSliceState } from "./types";

const initialState:ICartSliceState = {
    items: getCartFromLS().items,
    totalPrice: getCartFromLS().totalPrice
}

const cartSlice = createSlice({

    name:"cart",
    initialState:initialState,

    reducers:{
        addItem(state,action){
            const findItem = state.items.find(obj=>obj.id === action.payload.id);
           if(findItem){
            findItem.count ++;
           }
           else {
            state.items.push({...action.payload,count:1});
           }
    
           state.totalPrice = calcTotalPrice(state.items);
        },
        plusItem(state,action){
            const findItem = state.items.find(obj=>obj.id === action.payload);
           if(findItem){
            findItem.count ++;
            state.totalPrice = calcTotalPrice(state.items);
           }
        },
        minusItem(state,action){
            const findItem = state.items.find(obj=>obj.id === action.payload);
            if(findItem){
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state,action){
            state.items = state.items.filter(obj=>obj.id !== action.payload )
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state){
            state.items = [];
            state.totalPrice = 0;
        }
    }
});



export const {addItem,removeItem,clearItems,plusItem,minusItem} = cartSlice.actions;
export default cartSlice.reducer;