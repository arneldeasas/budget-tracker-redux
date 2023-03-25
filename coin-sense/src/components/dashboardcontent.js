import Transactions from "./transactions";
import Image from "next/image";
import Navbar from "./navbar";
const DashboardContent = (props) => {
    const {handleOpenBudget, handleOpenSavings, handleOpenAddExpense} = props;
    return ( 
        <div className="dashboard-content relative z-0">

            

            <div className="monthly-stat">
                <div>
                    <div className="capsule capsule-balance">Balance</div>
                    <div className="">
                        <h2>₱5970</h2>
                    </div>
                    
                </div>
                <div className="relative">
                    
                    <i onClick={handleOpenBudget} class="fa-solid fa-pen-to-square edit-icon "></i>
                    <div className="capsule capsule-budget">Budget</div>
                    <div>
                        <h2>₱5970</h2>
                    </div>
                </div>
                <div className="relative">
                    <i onClick={handleOpenSavings} class="fa-solid fa-pen-to-square edit-icon "></i>
                    <div className="capsule capsule-savings">Target Savings</div>
                    <div>
                        <h2>₱5970</h2>
                    </div>
                </div>
                <div>
                    <div className="capsule capsule-expenses">Expenses</div>
                    <div>
                        <h2>₱5970</h2>
                    </div>
                </div>
            </div>
            <div className="daily-stat">
                <h2 className="text-[14px] text-center text-[#02bfc9] py-2">Today's Report</h2>
                <div className="daily-stat-box">
                    <div>
                        <h2 className="daily-stat-title">Limit</h2>
                        <h2>₱5970</h2>
                    </div>
                    <div>
                        <h2 className="daily-stat-title">Safe to Spend</h2>
                        <h2>₱5970</h2>
                    </div>
                    <div>
                        <h2 className="daily-stat-title">Total Spent</h2>
                        <h2>₱5970</h2>
                    </div>
                </div>
            </div>
            <div className="transaction-history">
                <div className="flex items-center w-full justify-between text-[#02bfc9] mt-3 ">
                    <h2>Recent Transactions</h2>
                    <div className="flex gap-2 items-center">
                        <i onClick={handleOpenAddExpense} className="fa-solid fa-square-plus text-3xl block "></i>
                        <div className="text-[12px] text-white p-1 px-2 rounded-full  bg-[#02bfc9]">See All</div>
                    </div>
                </div>
                <div className="mt-3 p-2 max-h-[85%] overflow-y-scroll ">
                    
                    <Transactions />
                    
                </div>
            </div>
            
        </div>
     );
}
 
export default DashboardContent;