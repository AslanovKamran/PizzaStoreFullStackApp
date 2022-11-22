import { createSlice } from '@reduxjs/toolkit'
import { IFilterSliceState } from './types';



const initialState:IFilterSliceState = {
    categoryId:0,
    sort: {  name: 'price ▾', sortProperty: 'price' },
    currentPage:1,

}

const filterSlice = createSlice({
    name:'filters',
    initialState:initialState,

    reducers:{
        
        setCategoryId(state,action){
            state.categoryId = action.payload;
        },

        setSort(state,action){
            state.sort = action.payload;
        },

        setCurrentPage(state, action){
            state.currentPage = action.payload;
        }


    }
});

export const {setCategoryId,setSort, setCurrentPage} = filterSlice.actions;
export default filterSlice.reducer;