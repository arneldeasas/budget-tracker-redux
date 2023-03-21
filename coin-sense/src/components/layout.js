import Navbar from "./navbar";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardContent from "./dashboardcontent";
import { OpenBackdrop } from "./navbar";

const Layout = ({children}) => {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(undefined);
    
    const router = useRouter();
    const {month} = router.query
    
    console.log(OpenBackdrop);
    const handleChangeMonth = (e)=>{
        
        router.push(`/dashboard/${e.target.value}`)
    }


    const handleClickCalendar=(e)=>{
        setOpenBackdrop(true);
        setOpenDropdown(true);
        if(openDropdown){
            setOpenBackdrop(false);
            setOpenDropdown(false);
        }
    }

   

    const handleMonthSelection=(event)=>{
        console.log(event.target)
        
    }


    const handleCalendarCloseAnimation=(event)=>{
        const wrapper = event.target.closest('.calendar-options-wrapper')
        if(!openDropdown){
            /* wrapper.classList.remove('calendar-animation-reverse'); */
            wrapper.classList.add('hidden');
        }
    }

    return setOpenBackdrop, ( 
        <div className="relative flex flex-col justify-center w-full  h-[100vh] p-5 bg-gradient-to-b from-[#fffdf7] to-[#c5eaeb]">
            {openBackdrop  && (<div className="fixed left-0 w-[100vw] h-[100vh] bg-gray-800/10 z-[3] backdrop-blur-sm"></div>)}
            <div className="dashboard w-full ">
                
                {/* whole calendar */}
                <div className="calendar-dropdown-container ">
                    <div onClick={handleClickCalendar} className="calendar-dropdown">
                        <span className="block text-[20px] font-light">{month}</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    
                    <div onClick={handleMonthSelection} onAnimationEnd={handleCalendarCloseAnimation} 
                    className={`calendar-options-wrapper 
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
                    
                {children}
                    
                </div>
                
            </div>
        </div>
     );
}
 
export default Layout;
