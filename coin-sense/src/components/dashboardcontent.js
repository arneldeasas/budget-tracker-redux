import Transactions from "./transactions";
import { useSelector, useDispatch } from "react-redux";
import { SetStat } from "@/redux/transaction";


import format from "date-fns/format";
import { getDaysInMonth } from "date-fns";
import { useEffect, useState } from "react";
import Image from "next/image";
const DashboardContent = (props) => {
    const {handleOpenBudget, handleOpenSavings, handleOpenAddExpense} = props;
    const {user:UserData, selectedMonth} = useSelector(state=>state.global)
    const {stat} = useSelector(state=>state.transaction);
    const dispatch = useDispatch();
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
    const [showExpenseList, setShowExpenseList] = useState(false);
    let monthObj;
    const [budget, setBudget] = useState(0);
    const [goal, setGoal] = useState(0);
    const [balance, setBalance] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [dailylimit, setDailylimit] = useState(0);
    const [spentToday, setSpentToday] = useState(0);
    const [safeToSpend, setSafeToSpend] = useState(0);

    const monthIndex = months.indexOf(selectedMonth)
    const date = new Date();
    const month = new Date(format(date,'yyyy'),monthIndex);
    const numberOfDays = getDaysInMonth(month);
    console.log(stat.expenses)
    
    useEffect(()=>{

        const ShowExpenseList= async()=>{
           await stat.expenses > 0 ? setShowExpenseList(true) : setShowExpenseList(false);
           console.log(stat.expenses)
        }
        ShowExpenseList();

        /* if (UserData.calendar && UserData.calendar.length > 0) {
            console.log('lvl1')
            monthObj = UserData.calendar.filter(calendar=>calendar.month===selectedMonth)
            if(monthObj.length>0 && monthObj[0].expenses.length>0){
                
                console.log('lvl2')
            }
           
        } else {
            console.log('Calendar is empty');
        } */

    },[UserData,selectedMonth])
    

    return ( 
        <div className="dashboard-content relative z-0">

            <div className="monthly-stat">
                <div>
                    <div className="capsule capsule-balance">Balance</div>
                    <div className="">
                        <h2>₱{stat.balance}</h2>
                    </div>
                    
                </div>
                <div className="relative">
                    
                    <i onClick={handleOpenBudget} class="fa-solid fa-pen-to-square edit-icon "></i>
                    <div className="capsule capsule-budget">Budget</div>
                    <div>
                        <h2>₱{stat.budget}</h2>
                    </div>
                </div>
                <div className="relative">
                    <i onClick={handleOpenSavings} class="fa-solid fa-pen-to-square edit-icon "></i>
                    <div className="capsule capsule-savings">Target Savings</div>
                    <div>
                        <h2>{stat.goal}</h2>
                    </div>
                </div>
                <div>
                    <div className="capsule capsule-expenses">Expenses</div>
                    <div>
                        <h2>{stat.expenses}</h2>
                    </div>
                </div>
            </div>
            <div className="daily-stat">
                <h2 className="text-[14px] text-center text-[#02bfc9] py-2">Today's Report</h2>
                <div className="daily-stat-box">
                    <div>
                        <h2 className="daily-stat-title">Limit</h2>
                        <h2>{stat.dailylimit}</h2>
                    </div>
                    <div>
                        <h2 className="daily-stat-title">Safe to Spend</h2>
                        <h2>{stat.safetospend}</h2>
                    </div>
                    <div>
                        <h2 className="daily-stat-title">Spent today</h2>
                        <h2>{stat.spentToday}</h2>
                    </div>
                </div>
            </div>
            <div className="transaction-history ">
                <div className="flex items-center w-full justify-between text-[#02bfc9] mt-3 ">
                    <h2>Recent Transactions</h2>
                    <div className="flex gap-2 items-center">
                        <i onClick={handleOpenAddExpense} className="fa-solid fa-square-plus text-3xl block "></i>
                        <div className="text-[12px] text-white p-1 px-2 rounded-full  bg-[#02bfc9]">See All</div>
                    </div>
                </div>
                <div className="mt-3 p-2 max-h-[85%] overflow-y-scroll h-full">
                    {!showExpenseList &&
                        (<div className="w-[100%] h-full flex items-center justify-center ">
                        <div>
                            <Image className="mx-auto opacity-30" src='/icons/empty.png' alt='food-icon' width={100} height={100}/>
                            <h1 className="text-center text-[#0081a7]/70">The list is currently empty...</h1>
                        </div>
                        </div>
                    )}
                    
                    
                    {showExpenseList && <Transactions />}
                    
                    
                </div>
            </div>
            
        </div>
     );
}
 
export default DashboardContent;