import Navbar from "./navbar";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardContent from "./dashboardcontent";
import { OpenBackdrop } from "./navbar";
import Image from "next/image";
const Layout = ({children}) => {

    const [descLength, setDescLength] = useState(0);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [closedDropdown, setClosedDropdown] = useState(true);

    const [openBudget, setOpenBudget] = useState(false);
    const [closedBudget, setClosedBudget] = useState(true);

    const [openSavings, setOpenSavings] = useState(false);
    const [closedSavings, setClosedSavings] = useState(true);

    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [closedAddExpense, setClosedAddExpense] = useState(true);

    const [openTransactionDetails, setOpenTransactionDetails] = useState(true);
    const [closedTransactionDetails, setClosedTransactionDetails] = useState(true);


    const router = useRouter();
    const {month} = router.query
    
    
    const handleChangeMonth = (e)=>{
        
        router.push(`/dashboard/${e.target.value}`)
    }

   /*  const handleOpenBackdrop=(e)=>{
        setOpenBackdrop(true);
        if(openDropdown){
            setOpenBackdrop(false);
        }
    } */

    const handleExpenseDescChange=(event)=>{
        let textLength = event.target.value.length;
        setDescLength(textLength)

    }

//animation related functions***************************************************
    const handleClickedDropDown=()=>{ 
        setOpenDropdown(true);
        setOpenBackdrop(true);
        setClosedDropdown(false);
        if(openDropdown){
            setOpenDropdown(false);
            setOpenBackdrop(false);
        }
    }
   
    const handleOpenBudget=(e)=>{
        setClosedBudget(false);
        setOpenBudget(true);
        console.log(e.target);
        console.log(openBudget)
    }

    const handleOpenSavings=()=>{
        setClosedSavings(false);
        setOpenSavings(true);
    }
    
    const handleOpenAddExpense=()=>{
        setClosedAddExpense(false);
        setOpenAddExpense(true);
    }

    const handleMonthSelection=(event)=>{
        console.log(event.target)
        
    }


    const handleCloseAnimation=(event)=>{
        
        if(!openDropdown && event.target.id==='January' ){
            /* setClosedBudget(true) */
            setClosedDropdown(true);
            console.log(event.target)
            console.log(closedDropdown);
        }

        if(!openBudget && event.target.id ==='budget'){
            setClosedBudget(true);
        }

        if(!openSavings && event.target.id === 'savings'){
            setClosedSavings(true);
            console.log(event.target)
            console.log(openSavings)
        }

        if(!openAddExpense && event.target.id === 'add-expense' ){
            setClosedAddExpense(true);
        }
    }

//*******************************************************animation related functions */

    return setOpenBackdrop, ( 
        <div className="relative flex flex-col justify-center w-full  h-[100vh] p-5 bg-gradient-to-b from-[#fffdf7] to-[#c5eaeb]">

            {/* This section is for popups */}
            {openBackdrop  && (<div className="fixed left-0 w-[100vw] h-[100vh] bg-gray-800/10 z-[3] backdrop-blur-sm"></div>)}

            {/* modal for inputting the budget for the month */}
            <div className={`prompt-box-container ${closedBudget? 'hidden':''} `}>

                <div 
                    id='budget' 
                    onAnimationEnd={handleCloseAnimation} 
                    className={`prompt-box relative  ${(openBudget ? 'pop-in-animation':'pop-out-animation')}`}
                >

                    <div onClick={()=>{setOpenBudget(false)}} className="x-button">
                        <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                    </div>
                    <h2 className="prompt-box-title">My budget <br></br>for this month is...</h2>
                    <div className="flex items-center border-b-[1px] border-[#02bfc9] my-3">
                        <span className="block text-2xl font-light text-[#0081a7]">₱</span>
                        <input placeholder="Enter amount" type="number" name="budgetamount" id="budgetamount" className="amount-input"/>
                    </div>
                    <button className="confirm-button">confirm</button>
                    
                </div>
            </div>
            
            {/* modal for inputting Save target */}
            <div className={`prompt-box-container ${closedSavings ? 'hidden':''} `}>

                <div 
                    id='savings' 
                    onAnimationEnd={handleCloseAnimation} 
                    className={`prompt-box relative  ${openSavings ? 'pop-in-animation' : 'pop-out-animation'} `}
                >
                    
                    <div onClick={()=>{setOpenSavings(false)}} className="x-button">
                        <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                    </div>
                    <h2 className="prompt-box-title">I want to save<br></br>an amount of...</h2>
                    <div className="flex items-center border-b-[1px] border-[#02bfc9] my-3">
                        <span className="block text-2xl font-light text-[#0081a7]">₱</span>
                        <input placeholder="Enter amount" type="number" name="saveamount" id="saveamount" className="amount-input"/>
                    </div>
                    <button className="confirm-button">confirm</button>

                </div>
            </div>

            {/* modal for Adding Expense */}
            <div className={`prompt-box-container ${closedAddExpense ? 'hidden':''} `}>

                <div 
                    id='add-expense' 
                    onAnimationEnd={handleCloseAnimation} 
                    className={`prompt-box relative  ${openAddExpense ? 'pop-in-animation' : 'pop-out-animation'} `}
                >
                    
                    <div onClick={()=>{setOpenAddExpense(false)}} className="x-button">
                        <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                    </div>
                    <h2 className="prompt-box-title">Today, <br></br>I have spent...</h2>
                    <div className="flex items-center border-b-[1px] border-[#02bfc9] my-3">
                        <span className="block text-2xl font-light text-[#0081a7]">₱</span>
                        <input placeholder="Enter amount" type="number" name="saveamount" id="saveamount" className="amount-input"/>
                    </div>
                    <h2 className="text-[#0081a7] font-light my-8">for</h2>
                    <div className="expense-type-container">
                        <div id="food">Food</div>
                        <div id="transport">Transport</div>
                        <div id="school">School</div>
                        <div id="health">Health</div>
                        <div id="entertainment">Entertainment</div>
                        <div id="others">Others</div>

                    </div>
                    <label className="mt-8 mb-0 block text-[#0081a7] font-light my-6" htmlFor="expense-description">Description (optional):</label>
                    <textarea onChange={handleExpenseDescChange} placeholder="Write something..." maxLength='120' name="expense-description" id="expense-description" cols="30" rows="3"></textarea>
                    <p className="leading-3 font-light text-[14px] text-right text-gray-500">{descLength}/120</p>
                    <button className="confirm-button">confirm</button>

                </div>
            </div>

            <div className={`prompt-box-container ${closedTransactionDetails ? '.hidden':''} `}>

                <div 
                    id='add-expense' 
                    onAnimationEnd={handleCloseAnimation} 
                    className={`prompt-box w-[60%] relative  ${openTransactionDetails ? 'pop-in-animation' : 'pop-out-animation'} `}
                >
                    
                    <div onClick={()=>{setOpenAddExpense(false)}} className="x-button">
                        <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                    </div>
                    <div className="bg-[#aad8db] w-fit h-fit rounded-full mx-auto"><Image className="p-10 box-content" src='/icons/food-icon.png' width='100' height='100'></Image></div>
                    <h2 className="prompt-box-title text-center my-3">Food</h2>
                    
                    <ul className="details-properties">
                        <li>Price:</li>
                        <li>Time:</li>
                        <li>Date:</li>
                        <li>Description:</li>
                    </ul>
                    
                    <button className="confirm-button">close</button>

                </div>
            </div>



            <div className="dashboard w-full ">
                
                {/* whole calendar */}
                <div className="calendar-dropdown-container ">
                    <div onClick={handleClickedDropDown} className="calendar-dropdown">
                        <span className="block text-[20px] font-light">{month}</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    
                    <div id='calendar-options' onClick={handleMonthSelection} onAnimationEnd={handleCloseAnimation} 
                    className={`calendar-options-wrapper ${closedDropdown ?'hidden':''} 
                    ${ (openDropdown ? 'calendar-animation':'calendar-animation-reverse')}`}>
                        <div id='January' >January</div>
                        <div>February</div>
                        <div>March</div>
                        <div>April</div>
                        <div>May</div>
                        <div>June</div>
                        <div>July</div>
                        <div>August</div>
                        <div>September</div>
                        <div>October</div>
                        <div>November</div>
                        <div>December</div>
                    </div>

                   
                </div>

                <div className=" dashboard-body flex flex-col justify-between h-full">
                    
                {/* {children} */}
                    <DashboardContent 
                        handleOpenBudget = {handleOpenBudget} 
                        handleOpenSavings = {handleOpenSavings} 
                        handleOpenAddExpense = {handleOpenAddExpense} 
                    />

                    <Navbar/>
                </div>
                
            </div>
        </div>
     );
}
 
export default Layout;
