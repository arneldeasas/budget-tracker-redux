import Link from "next/link";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";



const Navbar = ({month}) => {
    const {user:UserData} = useSelector(state=>state.global)

    
    console.log(UserData)
    const router = useRouter();
    const [openBackdrop,setOpenBackdrop]=useState(false);
    const [openAccPanel,setOpenAccPanel] = useState(false);
    const handleClose=()=>{
        setOpenBackdrop(false);
        setOpenAccPanel(false);
    }   
    
    
    return ( 
        <div className='absolute bottom-0 bg-transparent flex justify-between py-2 text-3xl text-[#02bfc9] w-full '>
            {openBackdrop && (<div onClick={handleClose} className="acc-backdrop fixed top-0 left-0 z-[10] w-full h-full bg-gray-800/30 backdrop-blur-sm"></div>)}

            <div className={`account-panel overflow-hidden flex flex-col justify-between  ${openAccPanel ? 'account-panel-slide':''}`}>
                <div className="relative bg-[#02bfc9]">
                    <div onClick={handleClose} className="absolute left-4 top-4 w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
                        <i class="fa-solid fa-xmark text-lg text-[#02bfc9]"></i>
                    </div>
                    <div className=" absolute right-0 top-5 w-fit rounded-l-full bg-white py-[5px] px-[10px]">
                        <h1 className='text-2xl  font-medium text-right mx-2'><span className='text-[#0081a7]'>Coin</span><span className='text-[#3fd9d7]'>Sense</span></h1>
                    </div>
                    <div className="profile-logo">
                        <i className="fa-solid fa-user text-[4.5rem] text-[white] drop-shadow-md"></i>
                    </div>
                    
                    <h2 className="text-white my-2 text-xl font-normal text-center">{`${UserData.firstname} ${UserData.lastname}`}</h2>
                    <h2 className="text-white my-4 text-base text-center font-light">
                        Edit Profile &nbsp;
                        <i class="fa-solid fa-pen"></i>
                    </h2>
                </div>
                
                <button onClick={()=>{router.push('/login')}} className="text-white font-light bg-[#02bfc9] p-2 my-5 w-[80%] text-xl rounded-full block mx-auto">Logout</button>
            </div>
            <div className="flex justify-between px-3 w-full mx-[10%]">
                <Link href={'/dashboard/'+month}><i className="fa-solid fa-house"></i></Link>
                <Link href={`/dashboard/${month}/report`}><i className="fa-solid fa-chart-simple"></i></Link>
                <div onClick={()=>{setOpenBackdrop(true);setOpenAccPanel(true)}} ><i className="fa-solid fa-address-card"></i></div>
            </div>
            
        </div>
    );
}
 
export default Navbar;
