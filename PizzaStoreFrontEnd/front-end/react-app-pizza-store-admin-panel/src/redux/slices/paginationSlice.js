import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   
    currentPage:1,

}

const paginationSlice = createSlice({
    name:'paginationSlice',
    initialState:initialState,

    reducers:{
        setCurrentPage(state, action){
            state.currentPage = action.payload;
        }


    }
});

export const paginationSelector = (state) =>(state.paginationSlice);

export const {setCurrentPage} = paginationSlice.actions;
export default paginationSlice.reducer;