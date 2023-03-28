import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Transactions = () => {
    const today = new Date();
    
    const {user, selectedMonth} = useSelector(state=>state.global)
    const [todayExpenses, setTodayExpenses] = useState([]);
    const [monthObj, setMonthObj] = useState([]);
    useEffect(()=>{
      
      setMonthObj(user.calendar.filter(calendar=> calendar.month === selectedMonth)) 
      const monthObj = user.calendar.filter(calendar=> calendar.month === selectedMonth)
      setTodayExpenses(monthObj[0].expenses.filter(expense => expense.day === format(today,'d'))) 
      
    },[user])

    return ( 
        <div className="flex flex-col gap-2 " >
            {
                todayExpenses.sort((a, b) => parseInt(b.timeinseconds) - parseInt(a.timeinseconds)).map(expense=>
                    (
         
                        <div key={expense.id} className="transaction-item">
                            <div className="bg-[#aad8db] rounded-lg w-[40px] h-[40px] p-2">
                                <Image src='/icons/food-icon.png' alt='food-icon' width={35} height={35}/>
                            </div>
                            <div>
                                <h2 className="text-[14px] font-semibold">{expense.type}</h2>
                                <h3 className="text-[12px] ">description...</h3>
                            </div>
                            <div>
                                <h2 className="text-[14px] font-semibold text-[#f67659] text-right">-₱{expense.price}</h2>
                                <h3 className="text-[12px] ">{expense.time}</h3>
                            </div>
                        </div>
                        
                    )
                )
            }

            
        </div>
     );
}
 
export default Transactions;