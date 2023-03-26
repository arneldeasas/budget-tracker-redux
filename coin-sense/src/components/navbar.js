import Link from "next/link";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";



const Navbar = ({month}) => {
    const router = useRouter();
    const [openBackdrop,setOpenBackdrop]=useState(false);
    const [openAccPanel,setOpenAccPanel] = useState(false);
    const handleClose=()=>{
        setOpenBackdrop(false);
        setOpenAccPanel(false);
    }   
    
    
    return ( 
        <div className='bg-transparent flex justify-between py-1 text-3xl text-[#02bfc9] w-full '>
            {openBackdrop && (<div onClick={handleClose} className="acc-backdrop fixed top-0 left-0 z-[10] w-full h-full bg-gray-800/30 backdrop-blur-sm"></div>)}

            <div className={`account-panel flex flex-col justify-between  ${openAccPanel ? 'account-panel-slide':''}`}>
                <div>
                    <div className="w-full py-[10px]">
                        <h1 className='text-2xl font-medium text-right mx-2'><span className='text-[#0081a7]'>Coin</span><span className='text-[#3fd9d7]'>Sense</span></h1>
                    </div>
                    <div className="profile-logo">
                        <i className="fa-solid fa-user text-[6.5rem] text-[white] drop-shadow-md"></i>
                    </div>
                    <h2 className="text-[#0081a7] font-medium text-lg text-center">@username</h2>
                    <h2 className="profile-name text-[#02bfc9] my-4">Arnel D. De Asas Jr</h2>
                </div>
                
                <button onClick={()=>{router.push('/login')}} className="text-white font-light bg-[#02bfc9] p-2 my-5 w-[80%] text-xl rounded-full block mx-auto">Logout</button>
            </div>
            <div className="flex justify-between w-full mx-[10%]">
                <Link href={'/dashboard/'+month}><i className="fa-solid fa-house"></i></Link>
                <Link href={`/dashboard/${month}/report`}><i className="fa-solid fa-chart-simple"></i></Link>
                <div onClick={()=>{setOpenBackdrop(true);setOpenAccPanel(true)}} ><i className="fa-solid fa-address-card"></i></div>
            </div>
            
        </div>
    );
}
 
export default Navbar;
