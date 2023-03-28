import { createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/getDaysInMonth';


const today = new Date();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


export const transaction = createSlice({
  name: 'transaction',
  initialState: {
    stat: {
        today: 0,
        budget: 0,
        goal:0,
        balance: 0,
        goal: 0,
        expenses: 0,
        spentToday: 0,
        dailylimit: 0,
        safetospend: 0,
        spenttoday: 0,
    },
    transactionDetails:{
        id:'',
        type: '',
        price:'',
        time:'',
        date:'',
        description:'',
    },
    transactionItem: {}
  },
  reducers: {

    SetStat: (state,action)=>{
        const monthObj = action.payload;
        if(monthObj){
          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
          const monthIndex = months.indexOf(monthObj.month)
          const month = new Date(format(today,'yyyy'),monthIndex);
          const numberOfDays = getDaysInMonth(month);
          
          state.stat.budget = monthObj.budget;
          state.stat.goal = monthObj.goal;
          state.stat.expenses = monthObj.expenses
                                .map(expense=>expense.price)
                                .reduce((accumulator, currentItem)=>parseInt(accumulator) + parseInt(currentItem),0);
          state.stat.balance = monthObj.budget - (monthObj.expenses
                                        .map(expense=>expense.price)
                                        .reduce((accumulator, currentItem)=>parseInt(accumulator) + parseInt(currentItem),0))
          state.stat.spentToday = monthObj.expenses
                              .filter(expense => expense.day == format(today,'d'))
                              .map(expense => expense.price)
                              .reduce((accumulator, currentItem)=>parseInt(accumulator) + parseInt(currentItem),0);
          state.stat.dailylimit = Math.floor((monthObj.budget - monthObj.goal) / numberOfDays);
          state.stat.safetospend = state.stat.dailylimit - state.stat.spentToday
        }  
    },
    SetTransactionDetails: (state,action)=>{
      const details = action.payload
      state.transactionItem = details;
      state.transactionDetails.id = details.id
      state.transactionDetails.type = details.type;
      state.transactionDetails.price = details.price;
      state.transactionDetails.time = details.time;
      state.transactionDetails.date = details.date;
      state.transactionDetails.description = details.description;
    }
  }
 }
)

// Action creators are generated for each case reducer function
export const { SetStat, SetTransactionDetails} = transaction.actions

export default transaction.reducer