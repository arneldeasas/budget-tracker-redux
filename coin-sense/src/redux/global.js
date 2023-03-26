import { createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format';

const date = new Date();

export const global = createSlice({
  name: 'global',
  initialState: {
    userId: '',
    username:'',
    firstname: '',
    lastname: '',
    currentMonth:'',
    selectedMonth: '',

  },
  reducers: {
    GetCurrentMonth: state =>{
        state.currentMonth = format(date, 'MMMM')
        
    },
    GetUsername: (state, action)=>{
        const userDetails = action.payload;
        state.userId = userDetails.id;
        state.username = userDetails.username;
        state.firstname = userDetails.firstname;
        state.lastname = userDetails.lastname;
    },
    GetSelectedMonth: (state,action)=>{
        state.selectedMonth = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { GetCurrentMonth, GetUsername, GetSelectedMonth} = global.actions

export default global.reducer