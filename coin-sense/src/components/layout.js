import Navbar from "./navbar";
import Router, { useRouter } from "next/router";
import { useState } from "react";
const Layout = ({children}) => {
    
    const router = useRouter();
    const {month} = router.query
    
    const handleChangeMonth = (e)=>{
        
        router.push(`/dashboard/${e.target.value}`)
    }

    return ( 
        <div className="flex flex-col justify-between place-items-center w-full bg-gray-200 h-[100vh]">
            <div className="w-full bg-blue-400 py-4 text-white">
                <form>
                    <select onChange={handleChangeMonth} value={month} className="bg-transparent font-bold text-2xl mx-4" name="calendar" id="calendar">
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </form>
            </div>
            {children}

            <Navbar month={month} />
            
        </div>
     );
}
 
export default Layout;