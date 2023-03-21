import Link from "next/link";
import { useEffect, useState } from "react";




const Navbar = ({month}) => {
    const [openBackdrop,setOpenBackdrop]=useState(false);
    const [openAccPanel,setOpenAccPanel] = useState(false);
    const handleClose=()=>{
        setOpenBackdrop(false);
        setOpenAccPanel(false);
    }    
    return ( 
        <div className='bg-transparent flex justify-around py-1 text-3xl text-[#02bfc9] w-full '>
            {openBackdrop && (<div onClick={handleClose} className="acc-backdrop fixed top-0 left-0 z-[10] w-full h-full bg-gray-800/30"></div>)}

            <div className={`account-panel ${openAccPanel ? 'account-panel-slide':''}`}>Account</div>

            <Link href={'/dashboard/'+month}><i className="fa-solid fa-house"></i></Link>
            <Link href={`/dashboard/${month}/report`}><i className="fa-solid fa-chart-simple"></i></Link>
            <div onClick={()=>{setOpenBackdrop(true);setOpenAccPanel(true)}} ><i className="fa-solid fa-address-card"></i></div>
        </div>
    );
}
 
export default Navbar;
