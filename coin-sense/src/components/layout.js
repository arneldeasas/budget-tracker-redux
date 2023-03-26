import Navbar from "./navbar";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardContent from "./dashboardcontent";
import { OpenBackdrop } from "./navbar";
import Image from "next/image";
import { dataUploader, dataLoader } from "@/pages/signup";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentMonth, GetSelectedMonth } from "@/redux/global";
const Layout = ({children}) => {
    const dispatch = useDispatch();
    const [expenseAmount, setExpenseAmount] = useState('');
    const [descLength, setDescLength] = useState(0);
    const [expenseType, setExpenseType] = useState('');
    const [transactionDescription, setTransactionDescription] = useState('');
    const [activeButton, setActiveButton] = useState(false);
    const [budget, setBudget] = useState('');
    const [save, setSave] = useState('');

    const [showStart, setShowStart] = useState(true);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [closedDropdown, setClosedDropdown] = useState(true);

    const [openBudget, setOpenBudget] = useState(false);
    const [closedBudget, setClosedBudget] = useState(true);

    const [openSavings, setOpenSavings] = useState(false);
    const [closedSavings, setClosedSavings] = useState(true);

    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [closedAddExpense, setClosedAddExpense] = useState(true);

    const [openTransactionDetails, setOpenTransactionDetails] = useState(false);
    const [closedTransactionDetails, setClosedTransactionDetails] = useState(true);

    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showTransactionDetails, setShowTransactionDetails] = useState(true);

    const router = useRouter();

    const {month} = router.query
    
    const {userId} = useSelector(state=>state.global)
    
    const handleChangeMonth = (e)=>{
        
        router.push(`/dashboard/${e.target.value}`)
    }

   /*  const handleOpenBackdrop=(e)=>{
        setOpenBackdrop(true);
        if(openDropdown){
            setOpenBackdrop(false);
        }
    } */
    const chooseExpenseType = (e)=> {
        
        if(activeButton){
            activeButton.classList.remove('selected-item')
        }

        if(e.target.closest(`.type`)){
            const expenseType = e.target.id;
            setActiveButton(e.target?.closest(`#${expenseType}`));
            e.target.closest(`#${expenseType}`).classList.add('selected-item');
        }
        
    }

    const handleExpenseDescChange=(event)=>{
        setTransactionDescription(event.target.value);
        let textLength = event.target.value.length;
        setDescLength(textLength)

    }

    const clearForm=(event)=>{
        setDescLength(0);
        setTransactionDescription('');
        setExpenseAmount('');
        setBudget('');
        setSave('');
    }
    
    const handleMonthSelection=(event)=>{
        console.log(event.target.id)
        dispatch(GetCurrentMonth());
        
        if(event.target.className==='month'){
            setOpenDropdown(false);
            dispatch(GetSelectedMonth(event.target.id));
            router.push(`/dashboard/${event.target.id}`);
        }
        
    }

    const startMonth = async ()=>{
        const user = await dataLoader(`http://localhost:8000/users/${userId}`);
        console.log(user);
        const monthProperties = {
            month:month,
            budget: 0,
            goal: 0,
            expenses:[]
        }

        user.calendar.push(monthProperties)
        console.log(user);
        dataUploader(`http://localhost:8000/users/${userId}`,'PATCH',user) ? setShowStart(false) : '';
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

    


    const handleCloseAnimation=(event)=>{
        
        if(!openDropdown && event.target.id==='January' ){
            /* setClosedBudget(true) */
            setClosedDropdown(true);
            setOpenBackdrop(false);
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

                    <div onClick={()=>{setOpenBudget(false);clearForm()}} className="x-button">
                        <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                    </div>
                    <h2 className="prompt-box-title">My budget <br></br>for this month is...</h2>
                    <div className="flex items-center border-b-[1px] border-[#02bfc9] my-3">
                        <span className="block text-2xl font-light text-[#0081a7]">₱</span>
                        <input
                            onChange={(e)=>{setBudget(e.target.value)}} 
                            value = {budget}
                            placeholder="Enter amount" 
                            type="number" name="budgetamount" id="budgetamount" className="amount-input"/>
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
                    
                    <div onClick={()=>{setOpenSavings(false);clearForm()}} className="x-button">
                        <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                    </div>
                    <h2 className="prompt-box-title">I want to save<br></br>an amount of...</h2>
                    <div className="flex items-center border-b-[1px] border-[#02bfc9] my-3">
                        <span className="block text-2xl font-light text-[#0081a7]">₱</span>
                        <input 
                            onChange={(e)=>{setSave(e.target.value)}}
                            value={save}
                            placeholder="Enter amount" 
                            type="number" name="saveamount" 
                            id="saveamount" className="amount-input"/>
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
                    <form onSubmit={()=>{clearForm()}}>
                        <div onClick={()=>{setOpenAddExpense(false);clearForm();}} className="x-button">
                            <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                        </div>
                        <h2 className="prompt-box-title">Today, <br></br>I have spent...</h2>
                        <div className="flex items-center border-b-[1px] border-[#02bfc9] my-3">
                            <span className="block text-2xl font-light text-[#0081a7]">₱</span>
                            <input 
                                onChange={(e)=>{setExpenseAmount(e.target.value)}} 
                                placeholder="Enter amount" value={expenseAmount} 
                                type="number" name="expenseAmount" id="expenseAmount" className="amount-input"
                            />
                        </div>
                        <h2 className="text-[#0081a7] font-light my-8">for</h2>
                        <div onClick={chooseExpenseType} className="expense-type-container">
                            <div className="type" id="food">Food</div>
                            <div className="type" id="transport">Transport</div>
                            <div className="type" id="school">School</div>
                            <div className="type" id="health">Health</div>
                            <div className="type" id="entertainment">Entertainment</div>
                            <div className="type" id="others">Others</div>

                        </div>
                        <label className="mt-8 mb-0 block text-[#0081a7] font-light my-6" htmlFor="expense-description">Description (optional):</label>
                        <textarea 
                            onChange={handleExpenseDescChange} 
                            value={transactionDescription}
                            placeholder="Write something..." 
                            maxLength='120' name="expense-description" id="expense-description" cols="30" rows="3">
                        </textarea>
                        <p className="leading-3 font-light text-[14px] text-right text-gray-500">{descLength}/120</p>
                        <button className="confirm-button">confirm</button>
                    </form>
                    

                </div>
            </div>

            <div className={`prompt-box-container ${closedTransactionDetails ? 'hidden':''} `}>

                <div 
                    id='add-expense' 
                    onAnimationEnd={handleCloseAnimation} 
                    className={`prompt-box w-[60%] max-w-[300px] relative  ${openTransactionDetails ? 'pop-in-animation' : 'pop-out-animation'} `}
                >
                    {showDeletePrompt && (
                        <div>
                            <h2 className="text-xl font-light text-[#0081a7] text-center">Delete this transaction?</h2>
                            <ul className="delete-prompt-options flex cursor-default">
                                <li 
                                    className="text-[#02bfc9] duration-150 bg-transparent border-[1px] border-[#02bfc9] hover:text-white hover:bg-[#02bfc9]"
                                >YES</li>
                                <li onClick={()=>{setShowDeletePrompt(false);setShowTransactionDetails(true);}} 
                                    className="text-white bg-[#02bfc9] border-[1px] border-[#02bfc9] duration-150 hover:text-[#02bfc9] hover:bg-transparent"
                                >NO</li>
                            </ul>
                        </div>
                    )}
                    
                    {showTransactionDetails && (
                        <div>
                            <div onClick={()=>{setShowDeletePrompt(true);setShowTransactionDetails(false)}} className='float-right'>
                                <i class="fa-solid fa-trash-can text-gray-400 text-2xl"></i>
                            </div>
                            <div className="bg-[#aad8db] w-fit h-fit rounded-full mx-auto"><Image className="p-10 box-content" src='/icons/food-icon.png' width='100' height='100'></Image></div>
                            <h2 className="prompt-box-title text-center my-3">Food</h2>
                            
                            <ul className="details-properties">
                                <li>Price: <span>₱100</span></li>
                                <li>Time: <span>11:00 am</span></li>
                                <li>Date: <span>Fri, March 12, 2023</span></li>
                                <li>Description:
                                    <span className="block text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima cum quos mollitia odio enim fuga error porro, saepe repudiandae dolores corrupti non sed earum, eum quidem nulla quis at ipsa!</span>
                                </li>
                            </ul>
                            <div onClick={()=>{setOpenTransactionDetails(false)}} className="w-[80%] mx-auto">
                                <button className="confirm-button">close</button>
                            </div>
                        </div>
                    )}
                    
                    
                    

                </div>
            </div>

            {showStart && (
                <div className="w-full h-[92%] fixed top-0 left-0 bg-gray-700/30 z-[2] backdrop-blur-md flex flex-col items-center justify-center text-white">
                    <h2 className="text-center text-xl drop-shadow-md">This month is empty</h2>
                    <button onClick={startMonth} className="block bg-[#02bfc9] p-2 px-6 rounded-full font-light m-2 shadow-md">start</button>
                </div>
            )}
                        

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
                        <div className="month" id='January' >January</div>
                        <div className="month" id='February'>February</div>
                        <div className="month" id='March'>March</div>
                        <div className="month" id='April'>April</div>
                        <div className="month" id='May'>May</div>
                        <div className="month" id='June'>June</div>
                        <div className="month" id='July'>July</div>
                        <div className="month" id='August'>August</div>
                        <div className="month" id='September'>September</div>
                        <div className="month" id='October'>October</div>
                        <div className="month" id='November'>November</div>
                        <div className="month" id='December'>December</div>
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
