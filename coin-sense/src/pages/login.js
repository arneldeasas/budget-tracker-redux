import {format} from "date-fns";
import Link from "next/link";
const Login = () => {
    const today = new Date()

    return ( 
        <div className="max-w-[600px] mx-auto h-[100vh] ">
            <div className="w-auto h-[100%] p-7 flex flex-col justify-end">
                <h1 className="text-5xl leading-[60px] text-[#0081a7]">Welcome <br/> User!</h1>
                <form className="login-form">
                    <div>
                        <label htmlFor='username' className="font-light ">Username</label>
                        <input className="login-inputs" type="text" name="username" id="username" />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className="font-light ">Password</label>
                        <input className="login-inputs" type="password" name="password" id="password" />
                    </div>
                    
                    <div>
                        <button className="login-button login ">Login</button>
                        <button className="login-button signup ">signup</button>
                    </div>
                    <p className="text-[#0081a7] text-[14px] font-light text-center"> Created by Alex and friends. &copy; 2023</p>
                </form>
            </div>
        </div>
     );
}
 
export default Login;