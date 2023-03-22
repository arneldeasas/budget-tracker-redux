import Navbar from "./navbar";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardContent from "./dashboardcontent";
import { OpenBackdrop } from "./navbar";

const Layout = ({children}) => {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(undefined);
    const [openBudget, setOpenBudget] = useState(undefined);
    const [closedBudget, setClosedBudget] = useState(true);

    const router = useRouter();
    const {month} = router.query
    
    
    const handleChangeMonth = (e)=>{
        
        router.push(`/dashboard/${e.target.value}`)
    }

    const handleOpenBackdrop=(e)=>{
        setOpenBackdrop(true);
        if(openDropdown){
            setOpenBackdrop(false);
        }
    }

    const handleOpenDropDown=()=>{ 
        setOpenDropdown(true)
        if(openDropdown){
            setOpenDropdown(false);
        }
    }
   
    const handleOpenBudget=(e)=>{
        setClosedBudget(false);
        setOpenBudget(true);
        console.log(e.target);
        console.log(openBudget)
    }

    
    const handleMonthSelection=(event)=>{
        console.log(event.target)
        
    }


    const handleCloseAnimation=(event)=>{
        
        if(!openDropdown && event.target.id==='calendar-options'){
            const wrapper = event.target.closest('.calendar-options-wrapper')
            /* wrapper.classList.remove('calendar-animation-reverse'); */
            wrapper.classList.add('hidden');
        }

        if(!openBudget && event.target.id ==='budget'){
            setClosedBudget(true);
        }
    }

    return setOpenBackdrop, ( 
        <div className="relative flex flex-col justify-center w-full  h-[100vh] p-5 bg-gradient-to-b from-[#fffdf7] to-[#c5eaeb]">

            {/* This section is for popups */}
            {openBackdrop  && (<div className="fixed left-0 w-[100vw] h-[100vh] bg-gray-800/10 z-[3] backdrop-blur-sm"></div>)}
            
            <div className={`prompt-box-container ${closedBudget? 'hidden':''} `}>

                <div id='budget' onAnimationEnd={handleCloseAnimation} className={`prompt-box relative  
                ${(openBudget===true||openBudget===false) && (openBudget ? 'pop-in-animation':'pop-out-animation')}`}>

                    <div onClick={()=>{setOpenBudget(false)}} className="x-button"><i className="fa-regular fa-circle-xmark text-3xl text-[#02bfc9]"></i></div>
                    <h2 className="text-center font-light text-md text-[#02bfc9]">My budget for this month is</h2>
                    <div className="flex items-center justify-center">
                        <span className="block text-4xl font-bold text-[#0081a7]">₱</span>
                        <input placeholder="amount" type="number" name="budgetamount" id="budgetamount" className="amount-input"/>
                    </div>
                    <button className="confirm-button">confirm</button>
                    
                </div>
            </div>
            



            <div className="dashboard w-full ">
                
                {/* whole calendar */}
                <div className="calendar-dropdown-container ">
                    <div onClick={()=>{handleOpenBackdrop();handleOpenDropDown()}} className="calendar-dropdown">
                        <span className="block text-[20px] font-light">{month}</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    
                    <div id='calendar-options' onClick={handleMonthSelection} onAnimationEnd={handleCloseAnimation} 
                    className={`calendar-options-wrapper ${(openDropdown===undefined) && 'hidden'} 
                    ${(openDropdown===true || openDropdown===false) && (openDropdown ? 'calendar-animation':'calendar-animation-reverse')}`}>
                        <div >January</div>
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
                    <DashboardContent handleOpenBudget = {handleOpenBudget} />
                    <Navbar/>
                </div>
                
            </div>
        </div>
     );
}
 
export default Layout;
