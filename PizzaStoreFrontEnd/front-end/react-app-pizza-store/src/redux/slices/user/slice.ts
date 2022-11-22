import { createSlice } from "@reduxjs/toolkit";
import { IUserSlice } from "./types";

const initialState:IUserSlice = {
    id: -1,
    login:'',
    password:'',
    isAdmin:false

}

const userSlice = createSlice({
name:"user",
initialState:initialState,

reducers:{
    setUser(state,action){
        state.id  = action.payload.id;
        state.login  = action.payload.login;
        state.password  = action.payload.password;
        state.isAdmin = action.payload.isAdmin
    }
}

});




export const{setUser} = userSlice.actions;
export default userSlice.reducer;