import { createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format';
const date = new Date();
export const global = createSlice({
  name: 'global',
  initialState: {
    user:{},
    userId: '',
    username: '',
    firstname: '',
    lastname: '',
    currentMonth:'',
    selectedMonth: '',
    calendar:[],
  },
  reducers: {
    SetUserData: (state,action)=>{
      state.user = action.payload;
    },
    GetCurrentMonth: state =>{
        state.currentMonth = format(date, 'MMMM')
        
    },
    GetUsername: (state, action)=>{
        const userDetails = action.payload;
        state.userId = userDetails.id;
        state.username = userDetails.username;
        state.firstname = userDetails.firstname;
        state.lastname = userDetails.lastname;
        state.calendar = userDetails.calendar;
    },
    GetSelectedMonth: (state,action)=>{
        state.selectedMonth = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { SetUserData, GetCurrentMonth, GetUsername, GetSelectedMonth} = global.actions

export default global.reducer