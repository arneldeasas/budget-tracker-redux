import { createSlice } from '@reduxjs/toolkit'


export const transaction = createSlice({
  name: 'transaction',
  initialState: {
    stat: {
        budget: 0,
        balance: 0,
        goal: 0,
        expenses: 0,
    }
  },
  reducers: {
    SetStat: (state,action)=>{
        state.stat = {
            ...state.stat,
            
        }
    }
  }
 }
)

// Action creators are generated for each case reducer function
export const { SetStat } = transaction.actions

export default transaction.reducer