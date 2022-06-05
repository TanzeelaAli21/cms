import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import agent from '../../../api/agent';

export const getClassesAsync = createAsyncThunk('admin/getClasses', async (token: string, {rejectWithValue})=>{
    const response = await agent.Class.getAllClasses(token);
    console.log('classes response', response);
    if(response.success)
        return response.classes;
    else{
        console.log('classes error');
        return rejectWithValue(response.message as string)
    }
})

export interface IClass {
    id?: number,
    courseId: string,

}

export interface IClassState {
    classes: IClass[],
    isLoading: true | false,
    errorMessage: string
}

const initialState: IClassState = {
    classes: [],
    isLoading: true,
    errorMessage: ''
}

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getClassesAsync.pending, (state)=>({...state, isLoading: true}))
        
        builder.addCase(getClassesAsync.rejected, (state, action)=> ({classes: [] , isLoading: false, errorMessage: action.error.message || 'error'}))

        builder.addCase(getClassesAsync.fulfilled, (state, action)=>({
            classes: action.payload,
            isLoading: false,
            errorMessage: ''
        }))
    }
})

export const {

} = classSlice.actions;

export const getClassSelector = (state: RootState) => state.classes;

export default classSlice.reducer;