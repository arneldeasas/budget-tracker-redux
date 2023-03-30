import Navbar from "./navbar";
import format from "date-fns/format";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardContent from "./dashboardcontent";
import { OpenBackdrop } from "./navbar";
import Image from "next/image";
import { dataUploader, dataLoader } from "@/pages/signup";
import { useDispatch, useSelector } from "react-redux";
import { SetUserData, GetCurrentMonth, GetSelectedMonth } from "@/redux/global";
import {  SetStat, SetTransactionDetails } from "@/redux/transaction";

/* export async function getServerSideProps(context) {
    
    // Fetch data from an API or database using the context object
    const res = await fetch(`http://localhost:8000/users/${id}`);
    const data = await res.json();
  
    // Return the data as props
    return {
      props: {
        data
      },
    };
  } */




const Layout = () => {
    const clone = require('rfdc')();
    const today = new Date();
    
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
    const [expenseTypeMissing, setExpenseTypeMissing] = useState(false);

    const [openTransactionDetails, setOpenTransactionDetails] = useState(false);
    const [closedTransactionDetails, setClosedTransactionDetails] = useState(true);

    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showTransactionDetails, setShowTransactionDetails] = useState(true);

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const router = useRouter();
    //let {months} = router.query
    const {user:UserData} = useSelector(state=>state.global);
    const {transactionItem, transactionDetails} = useSelector(state=> state.transaction)
    const [month, setMonth] = useState('')
    
    const [id, setId] = useState('');
    //let mm = format(today, 'MMMM');
       
useEffect( ()=>{
    

    const id = localStorage.getItem('id')
    setId(localStorage.getItem('id'));
    fetch(`http://localhost:8000/users/${id}`)
    .then(res => res.json())
    .then(data=>{
        setId(data.id)
        dispatch(SetUserData(data))
        
        console.log(data)

        let mm = localStorage.getItem('SelectedMonth')
        dispatch(GetSelectedMonth(mm));
        setMonth(mm)
        const monthObj = data.calendar.filter(calendar=>calendar.month === mm).map(calendar=> calendar.opened)
        setShowStart(!monthObj[0])
        console.log(monthObj,month)

        const selectedMonthObj = data.calendar.filter(calendar=>calendar.month === mm)
        
        dispatch(SetStat(selectedMonthObj[0]));
        
    })
    
},[month, showStart, closedAddExpense, closedBudget,closedSavings,closedTransactionDetails])
   
    const chooseExpenseType = (e)=> {
        
        if(activeButton){
            activeButton.classList.remove('selected-item')
        }

        if(e.target.closest(`.type`)){
            setExpenseType(e.target.id);
            setExpenseTypeMissing(false);
            const expenseType = e.target.id;
            setActiveButton(e.target?.closest(`#${expenseType}`));
            e.target.closest(`#${expenseType}`).classList.add('selected-item');
            console.log('dssadadaaaa')
        }else{
            console.log('dsaaaa')
            setExpenseType('');
            activeButton.classList.remove('selected-item')
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
        setExpenseType('');
        setBudget('');
        setSave('');
    }
    
    const handleMonthSelection=(event)=>{
        dispatch(GetCurrentMonth());
        
        if(event.target.className==='month'){
            setOpenDropdown(false);
            setMonth(event.target.id)
            localStorage.setItem('SelectedMonth',event.target.id)
            dispatch(GetSelectedMonth(event.target.id));
            router.push(`/dashboard/${event.target.id}`);
        }
        
    }

    const startMonth = async ()=>{
        const user = await dataLoader(`http://localhost:8000/users/${id}`);
        console.log(user);
        const monthProperties = {
            month:month,
            opened: true,
            budget: 0,
            goal: 0,
            expenses:[]
        }
        setShowStart(false)
        user.calendar = [
            ...user.calendar,monthProperties
        ]
        /* user.calendar.push(monthProperties)
        console.log(user); */
        dataUploader(`http://localhost:8000/users/${id}`,'PATCH',user);
    }

    const confirmBudget = ()=>{
        //let tempUserData = {...UserData};
        const tempUserData = clone(UserData);
        const index = tempUserData.calendar.findIndex(calendar=>calendar.month===month)
        tempUserData.calendar[index].budget = budget ;

        dataUploader(`http://localhost:8000/users/${id}`,'PATCH',tempUserData)
        
        clearForm();
        setOpenBudget(false);
    }

    const confirmGoal = ()=>{
        const tempUserData = clone(UserData);
        const index = tempUserData.calendar.findIndex(calendar=>calendar.month===month)
        tempUserData.calendar[index].goal = save;
        dataUploader(`http://localhost:8000/users/${id}`,'PATCH',tempUserData)
        
        console.log(save);
        clearForm();
        setOpenSavings(false);
    }
   
    const confirmExpense = (event)=>{
        event.preventDefault();

        if(expenseType.length > 0){
            setExpenseTypeMissing(false);
            const tempUserData = clone(UserData);
            const index = tempUserData.calendar.findIndex(calendar=>calendar.month===month)
            let lastId = 0;
            if(tempUserData.calendar.filter(calendar=> calendar.month ===month)[0].expenses.length > 0){
                const arrLength = tempUserData.calendar.filter(calendar=> calendar.month ===month)[0].expenses.length
                lastId = tempUserData.calendar.filter(calendar=> calendar.month ===month)[0].expenses[arrLength-1].id
            }
            

            const expenseProperties = {
                id: lastId + 1,
                day: format(today,'d'),
                price: expenseAmount,
                type: expenseType,
                description: transactionDescription,
                timeinseconds: format(today, 't'),
                time: format(today,'p'),
                date: format(today, 'E, MMM d, yyyy'),
                //newbalance: 
            }
            
            tempUserData.calendar[index].expenses.push(expenseProperties)
            dataUploader(`http://localhost:8000/users/${id}`,'PATCH',tempUserData);
            clearForm();
            activeButton.classList.remove('selected-item')
            setOpenAddExpense(false);
        }else{
            setExpenseTypeMissing(true);
        }
        
    }

    const handleDeleteTransaction = (event) =>{
        if(event.target.closest('#delete-transaction')){
            
            const indexOfItem = UserData.calendar.filter(calendar=>calendar.month === month)[0]
                                        .expenses.findIndex(expense => expense.id == transactionDetails.id)
    
            const tempUserData = clone(UserData);

            tempUserData.calendar.filter(calendar=>calendar.month===month)[0]
                        .expenses.splice(indexOfItem,1)
                        
            dataUploader(`http://localhost:8000/users/${id}`,'PATCH',tempUserData);
            
            setOpenTransactionDetails(false);
        }
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

    const handleOpenTransactionDetails = (event)=>{
        if(event.target.closest('.transaction-item')){
            const id = event.target.closest('.transaction-item').id
            const transactionItem = UserData.calendar.filter(calendar=>calendar.month === month)[0]
                                            .expenses.filter(expense => expense.id == id)[0];
            
            dispatch(SetTransactionDetails(transactionItem))
            setClosedTransactionDetails(false);
            setOpenTransactionDetails(true);

       }
        
        
    }


    const handleCloseAnimation=(event)=>{
        
        if(!openDropdown && event.target.id==='January' ){
            /* setClosedBudget(true) */
            setClosedDropdown(true);
            setOpenBackdrop(false);
            
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

        if(!openTransactionDetails && event.target.id === 'transaction-details' ){
            setClosedTransactionDetails(true);
        }
    }

//*******************************************************animation related functions */


    return ( 
        <div className="layout ">

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
                    <button onClick={confirmBudget} className="confirm-button">confirm</button>
                    
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
                    <button onClick={confirmGoal} className="confirm-button">confirm</button>

                </div>
            </div>

            {/* modal for Adding Expense */}
            <div className={`prompt-box-container ${closedAddExpense ? 'hidden':''} `}>

                <div 
                    id='add-expense' 
                    onAnimationEnd={handleCloseAnimation} 
                    className={`prompt-box relative  ${openAddExpense ? 'pop-in-animation' : 'pop-out-animation'} `}
                >
                    <form onSubmit={confirmExpense}>

                        <div 
                            onClick={()=>{
                                setOpenAddExpense(false);
                                clearForm();
                                setExpenseType('');
                                setExpenseTypeMissing(false);
                                activeButton.classList?.remove('selected-item')}
                            } 
                            className="x-button"
                        >
                            <i className="fa-regular fa-circle-xmark text-3xl text-white"></i>
                        </div>

                        <h2 className="prompt-box-title">Today, <br></br>I have spent...</h2>

                        <div className="flex items-center border-b-[1px] border-[#02bfc9] my-3">
                            <span className="block text-2xl font-light text-[#0081a7]">₱</span>
                            <input 
                                required
                                onChange={(e)=>{setExpenseAmount(e.target.value)}} 
                                placeholder="Enter amount" value={expenseAmount} 
                                type="number" name="expenseAmount" id="expenseAmount" className="amount-input"
                            />
                        </div>

                        <h2 className="text-[#0081a7] font-light my-8">for</h2>

                        <div onClick={chooseExpenseType} 
                            className={`expense-type-container duration-200  ${expenseTypeMissing ? 'border-2 animate-pulse border-[#f67659] p-2 rounded-lg' :'' }`}
                        >
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

            {/* modal for viewing a transaction details */}
            <div className={`prompt-box-container ${closedTransactionDetails ? 'hidden':''} `}>

                <div 
                    id='transaction-details' 
                    onAnimationEnd={handleCloseAnimation} 
                    className={`prompt-box w-[60%] max-w-[300px] relative  ${openTransactionDetails ? 'pop-in-animation' : 'pop-out-animation'} `}
                >
                    {showDeletePrompt && (
                        <div>
                            <h2 className="text-xl font-light text-[#0081a7] text-center">Delete this transaction?</h2>
                            <ul className="delete-prompt-options flex cursor-default">
                                <li onClick={handleDeleteTransaction} id='delete-transaction'
                                    className="white-button"
                                >YES</li>
                                <li onClick={()=>{setShowDeletePrompt(false);setShowTransactionDetails(true);}} 
                                    className="solid-button"
                                >NO</li>
                            </ul>
                        </div>
                    )}
                    
                    {showTransactionDetails && (
                        <div>
                            <div onClick={()=>{setShowDeletePrompt(true);setShowTransactionDetails(false)}} className='float-right'>
                                <i class="fa-solid fa-trash-can text-gray-400 text-2xl"></i>
                            </div>
                            <div className="bg-[#aad8db] w-fit h-fit rounded-full mx-auto">
                                {transactionDetails.type === 'food' && <Image className="p-10 box-content" src='/icons/food-icon.png' width='80' height='80'></Image>}
                                {transactionDetails.type === 'school' && <Image className="p-10 box-content" src='/icons/school.png' width='80' height='80'></Image>}
                                {transactionDetails.type === 'transport' && <Image className="p-10 box-content" src='/icons/transport.png' width='80' height='80'></Image>}
                                {transactionDetails.type === 'health' && <Image className="p-10 box-content" src='/icons/health.png' width='80' height='80'></Image>}
                                {transactionDetails.type === 'entertainment' && <Image className="p-10 box-content" src='/icons/entertainment.svg' width='80' height='80'></Image>}
                                {transactionDetails.type === 'others' && <Image className="p-10 box-content" src='/icons/others.png' width='80' height='80'></Image>}
                            </div>
                            <h2 className="prompt-box-title capitalize text-center my-3">{transactionDetails.type}</h2>
                            
                            <ul className="details-properties">
                                <li>Price: <span>₱{transactionDetails.price}</span></li>
                                <li>Time: <span>{transactionDetails.time}</span></li>
                                <li>Date: <span>{transactionDetails.date}</span></li>
                                <li>Description:
                                    <span className="block text-justify">{transactionDetails.description}</span>
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
                {/* to be continued */}
                {/* <div className="bg-gray-400/20 backdrop-blur-lg w-full h-full top-0 left-0 z-10 rounded-[34px] border-white border-[3px] absolute overflow-clip ">
                    <div className={`bg-[#02bfc9] absolute w-[130%] h-[150px] left-[50%] top-[0%] translate-x-[-50%] duration-[.8s] ease-out ${isSearchFocused ? 'rounded-full h-[400px] w-[140%] translate-y-[-50%]':''}`}>
                        
                    </div> 
                    <div className=" relative flex items-center justify-between mt-10 w-[90%] mx-auto rounded-full bg-white">
                            <input 
                                onFocus={()=>{setIsSearchFocused(true)}}
                                onBlur={()=>{setIsSearchFocused(false)}}
                                placeholder='search'
                                className="search-bar block "
                                type="text" name="search" id="search" 
                            />
                            <div className="mr-3 text-[#02bfc9]"><i class="fa-solid fa-magnifying-glass"></i></div>
                    </div>
                    
                </div> */}
                
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
                        handleOpenTransactionDetails = {handleOpenTransactionDetails}
                    />

                    <Navbar/>
                </div>
                
            </div>
        </div>
     );
}
 
export default Layout;
