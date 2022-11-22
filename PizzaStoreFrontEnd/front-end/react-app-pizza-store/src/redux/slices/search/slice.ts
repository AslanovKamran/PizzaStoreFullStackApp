import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { ISearchSliceState } from './types';


const initialState:ISearchSliceState = {
    searchValue: ''
}


const searchSlice = createSlice({
    name:'searchFilter',
    initialState:initialState,
    reducers:{
        setSearchValue(state,action){
            state.searchValue = action.payload;
        }
    }
}
);

export const {setSearchValue} = searchSlice.actions;
export default searchSlice.reducer;