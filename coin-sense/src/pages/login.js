import {format} from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dataLoader } from "./signup";

import { GetCurrentMonth, GetUsername } from "@/redux/global";
import { SetUserData } from "@/redux/global";
const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

   const date = new Date();

    /* useEffect(()=>{
        fetch(`http://localhost:8000/users`)
        .then(res => res.json())
        .then(data=>{
            
            dispatch(SetUserData(data))
            
        })
    },[]) */
    const goToSignup = event =>{
        event.preventDefault();
        router.push('/signup')
    }

    const handleLogin = async (event) =>{
        event.preventDefault();
        setIsLoggingIn(true);
        setTimeout(async() => {
            const users = await dataLoader('http://localhost:8000/users');

            const user = users.filter(user=>user.username === username)
            const id = user[0].id
            console.log(id)

            if(user.length > 0){
                console.log(user)
                console.log(password)
                console.log(user.password)
                if(user[0].password === password){
                    dispatch(SetUserData(user[0]))
                    localStorage.setItem('id',user[0].id)
                    localStorage.setItem('SelectedMonth',format(date,'MMMM'))
                    console.log(password);
                    const userDetails = {
                        id:user[0].id,
                        username,
                        firstname:user[0].firstname,
                        lastname:user[0].lastname,
                        calendar:user[0].calendar
                    }
                    console.log(userDetails)
                    dispatch(GetCurrentMonth());
                    dispatch(GetUsername(userDetails));
                    setIsLoggingIn(false);
                    setPasswordMatch(true);
                    router.push(`/dashboard/${format(date, 'MMMM')}`)
                }else{
                    setPasswordMatch(false);
                    setIsLoggingIn(false);
                }
            
            }
        }, 500);
        
        
    }

    return ( 
        <div className="max-w-[600px] mx-auto h-[100vh] ">
            <div className="w-auto h-[100%] p-7 flex flex-col justify-end">
                <h1 className="text-5xl leading-[60px] text-[#0081a7]">Welcome <br/> User!</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div>
                        <label htmlFor='username' className="font-light ">Username</label>
                        <input required
                            onChange={(e)=>{setUsername(e.target.value)}} 
                            className="login-inputs" type="text" name="username" id="username" />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className="font-light ">Password</label>
                        <input required
                            onChange={(e)=>(setPassword(e.target.value))}
                            className="login-inputs" type="password" name="password" id="password" />
                        {passwordMatch === false && <h2 className="mt-3 font-bold italic text-center text-[#f67659]">incorrect password</h2>}
                    </div>
                    
                    
                    <div>
                        {!isLoggingIn && <button className="login-button login ">Login</button>}
                        {isLoggingIn && <button disabled className="login-button login ">Logging in...</button>}
                        <button onClick={goToSignup} className="login-button signup ">signup</button>
                    </div>
                    <p className="text-[#0081a7] text-[14px] font-light text-center"> Created by Alex and friends. &copy; 2023</p>
                </form>
            </div>
        </div>
     );
}
 
export default Login;