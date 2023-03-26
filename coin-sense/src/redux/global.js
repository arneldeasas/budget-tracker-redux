import { createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format';

const date = new Date();

export const global = createSlice({
  name: 'global',
  initialState: {
    username:'',
    firstname: '',
    lastname: '',
    selectedMonth: '',

  },
  reducers: {
    GetCurrentMonth: state =>{
        state.selectedMonth = format(date, 'MMMM')
        
    },
    GetUsername: (state, action)=>{
        const userDetails = action.payload;
        state.username = userDetails.username;
        state.firstname = userDetails.firstname;
        state.lastname = userDetails.lastname;
    }
  }
})

// Action creators are generated for each case reducer function
export const { GetCurrentMonth, GetUsername} = global.actions

export default global.reducer