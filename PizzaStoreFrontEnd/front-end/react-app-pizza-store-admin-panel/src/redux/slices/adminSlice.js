import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    id:0,
    login:'',
    isAdmin:false
}

const adminSlice = createSlice({
    name:'adminSlice',
    initialState:initialState,

    reducers:{
        setAdmin(state, action){
            state.id = action.payload.id;
            state.isAdmin = action.payload.isAdmin;
            state.login = action.payload.login;
        }
    }
});

export const adminSelector = (state) =>(state.adminSlice);

export const {setAdmin} = adminSlice.actions;
export default adminSlice.reducer;

