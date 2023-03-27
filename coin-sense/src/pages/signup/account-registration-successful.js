import Image from "next/image";
import { useRouter } from "next/router";

const Success = () => {
    const router = useRouter();
    return ( 
        <div className="w-full h-full max-w-[400px] mx-auto">
           
                <Image className="fixed top-[-35%] right-[0] scale-[2] opacity-30" src="/icons/check.svg" alt="Food Icon" width={1000} height={1000} />
                <Image className="fixed top-[-15%] right-[-30%] scale-150" src="/icons/check.svg" alt="Food Icon" width={1000} height={1000} />
            
            <div className="fixed top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center">
                <h1 className="success mt-[80px] leading-tight">SUCCESS!</h1>
                <h2 className="text-center font-light text-2xl text-[#0081a7]">Your account has<br></br>been created.</h2>
                <button onClick={()=>{router.push('/login')}} className="success-continue">continue</button>
            </div>
        </div>
     );
}
 
export default Success;