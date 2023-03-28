import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const dataLoader = async (url)=>{
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(!response.ok ){
            throw Error('Content not available');
        }
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
    }

    
}

const dataUploader = async (url,type,upload) => {
    try {
        switch (type){
            case 'POST':
                fetch(url,{
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(upload)
                })
                .then(()=>{
                    return true
                })
                break;
            case 'PATCH':
                fetch(url,{
                    method: 'PATCH',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(upload)
                })
                .then(()=>{
                    return true
                })
                break;
                
            default:
        }
        
    } catch (error) {
        
    }
}
const Signup = () => {
    const router = useRouter();

    const [firstname, setFirstname] = useState('');
    const [isFnValid, setIsFnValid] = useState('');
    const [fnFocus,setFnFocus] = useState('');

    const [lastname,setLastname] = useState('');
    const [isLnValid, setIsLnValid] = useState('');
    const [lnFocus, setLnFocus] = useState('');

    const [username, setUsername] = useState('');
    const [isUnValid, setIsUnValid] = useState('');
    const [unFocus, setUnFocus] = useState('');

    const [password, setPassword] = useState('');
    const [isPwValid, setIsPwValid] = useState('');
    const [pwFocus, setPwFocus] = useState('');

    const [cpassword, setCpassword] = useState('');
    const [isCpwValid, setIsCpwValid] = useState(false);
    const [cpwFocus, setCpwFocus] = useState('');

    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    let namePattern = new RegExp(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/);
    let usernamePattern = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
    let passwordPattern = new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).{8,30}$/);
   

    const handleInputChange=(field, pattern, event)=>{
        
        switch(field){
            case 'firstname':
                setFirstname(event.target.value);
                if(!pattern.test(event.target.value)){
                    setIsFnValid(false);
                }else{
                    setIsFnValid(true);
                }
                break;
            case 'lastname':
                setLastname(event.target.value);
                if(!pattern.test(event.target.value)){
                    setIsLnValid(false);
                }else{
                    setIsLnValid(true);
                }
                break;
            case 'username':
                setUsername(event.target.value);
                if(!pattern.test(event.target.value)){
                    setIsUnValid(false);
                }else{
                    setIsUnValid(true);
                }
                break;
            case 'password':
                setPassword(event.target.value);
                if(!pattern.test(event.target.value)){
                    setIsPwValid(false);
                }else{
                    setIsPwValid(true);
                }
                break;
            case 'cpassword':
                
                setCpassword(event.target.value);
                
                if(event.target.value === password){
                    console.log(cpassword);
                    console.log(password)
                    console.log('matchh')
                    setIsCpwValid(true);
                }else{
                    setIsCpwValid(false)
                }
                break;
            default:
                break;
        }

        
    }

    const handleSubmitRegistration = async (event) => {
        event.preventDefault();
        console.log(username)
        const userData = {username,password,firstname,lastname,calendar:[]}

        setIsSigningUp(true);
        
        let users = await dataLoader('http://localhost:8000/users');
        if(users.map(user=>user.username ).includes(username)){
            setIsUsernameTaken(true);
            setIsSigningUp(false);
        }else{

            setTimeout(() => {
                dataUploader('http://localhost:8000/users','POST',userData) ? (router.push('/signup/account-registration-successful')) : '';
            }, 2000);
        
        }
    }

    return ( 
        <div className="signup-page">
            <div className="w-full py-[60px]">
            
                <h1 className='text-4xl font-medium ml-2 text-center'>
                    <span className='text-[#0081a7]'>Coin</span><span className='text-[#3fd9d7]'>Sense</span></h1>
                    
            </div>
            <div className="w-full">
                {isUsernameTaken && (
                    <h2 className="font-bold text-[#f67659] text-center italic">username already exists</h2>
                )}
                <form onSubmit={handleSubmitRegistration} className="signup-form">

                    {/* first name field */}
                    <div className="relative border-b-[1px] border-[#02bfc9] ">
                        <label htmlFor="fname">First name</label>
                        <div className="signup-input-container">
                            <input 
                                onChange={(event)=>{handleInputChange('firstname',namePattern,event)}}
                                onBlur={()=>setFnFocus(false)}
                                onFocus={()=>{setFnFocus(true)}}
                                value = {firstname}
                                maxLength='30' 
                                required 
                                pattern="^[a-zA-Z]+(?: [a-zA-Z]+)*$" 
                                type="text" name="fname" id="fname" className="grow"
                            />

                            <i className="fa-solid fa-circle-exclamation block p-1">
                                
                            </i>
                            <div className={`signup-tooltip-container ${fnFocus ? '':'hide-tooltip'}`}>
                                <div className={`signup-tooltip ${isFnValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                <h2>must be all letters</h2>

                                <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                            </div>
                            
                        </div>
                        </div>
                    </div>

                    {/* last name field */}
                    <div className="relative border-b-[1px] border-[#02bfc9]">
                        <label htmlFor="lname">Last name</label>
                        <div className="signup-input-container">
                            <input 
                            onChange={(event)=>{handleInputChange('lastname',namePattern,event)}}
                            onBlur={()=>setLnFocus(false)}
                            onFocus={()=>{setLnFocus(true)}}
                            value={lastname}
                            maxLength='30' 
                            required pattern="^[a-zA-Z]+(?: [a-zA-Z]+)*$" 
                            type="text" name="lname" id="lname" className="grow" />
                            <i className="fa-solid fa-circle-exclamation block p-1"></i>
                            <div className={`signup-tooltip-container ${lnFocus?'':'hide-tooltip'}`}>
                                <div className={`signup-tooltip ${isLnValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                    <h2>must be all letters</h2>

                                    <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                </div>
                            
                            </div>
                        </div>
                        
                        
                    </div>

                    {/* username field */}
                    <div className="relative border-b-[1px] border-[#02bfc9]">
                        <label htmlFor="username">Username</label>
                        <div className="signup-input-container">
                            <input 
                                onChange={(event)=>{handleInputChange('username',usernamePattern,event)}}
                                onBlur={()=>setUnFocus(false)}
                                onFocus={()=>{setUnFocus(true)}}
                                value={username}
                                maxLength='20' 
                                required pattern="^[a-zA-Z0-9]{6,20}$" 
                                type="text" name="username" id="username" className="grow"
                            />
                            <i className="fa-solid fa-circle-exclamation block p-1"></i>
                            <div className={`signup-tooltip-container ${unFocus?'':'hide-tooltip'}`}>
                                <div className={`signup-tooltip ${isUnValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                    <h2>must be atleast 6 characters long and 20 characters max</h2>
                                    <h2>must be in lowercase letters</h2>
                                    <h2>must not contain symbols</h2>

                                    <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="relative border-b-[1px] border-[#02bfc9]">
                        <label htmlFor="password">Password</label>
                        <div className="signup-input-container">
                            <input 
                            onChange={(event)=>{handleInputChange('password',passwordPattern,event)}}
                            onBlur = {()=>{setPwFocus(false)}}
                            onFocus={()=>{setPwFocus(true)}}
                            value = {password}
                            maxLength='20' 
                            required pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,30}$" 
                            type="password" name="password" id="password" className="grow"/>
                            <i className="fa-solid fa-circle-exclamation block p-1"></i>
                            <div className={`signup-tooltip-container ${pwFocus?'':'hide-tooltip'}`}>
                                <div className={`signup-tooltip ${isPwValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                    <h2>must be atleast 8 characters long and 30 characters max</h2>
                                    <h2>must contain atleast 1 uppercase letter</h2>
                                    <h2>must contain atleast 1 number</h2>

                                    <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                    {/* Password Matching field */}
                    <div className="relative border-b-[1px] border-[#02bfc9]">
                        <label htmlFor="cpassword">Re-type password</label>
                        <div className="signup-input-container">
                            <input 
                            onChange={(event)=>{handleInputChange('cpassword',password,event)}}
                            onBlur = {()=>{setCpwFocus(false)}}
                            onFocus={()=>{setCpwFocus(true)}}
                            value={cpassword}
                            required type="password" name="cpassword" id="cpassword" className="grow"/>
                            {!isCpwValid&&(
                                <div>
                                    <i className="fa-solid fa-circle-exclamation block p-1"></i>
                                    <div className={`signup-tooltip-container ${cpwFocus?'':'hide-tooltip'}`}>
                                        <div className={`signup-tooltip ${isCpwValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                            <h2>password does not match</h2>

                                            <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                        </div>
                                    
                                    </div>
                                </div>

                            )}
                            
                        </div>
                       
                    </div>

                    {!isSigningUp ? 
                    (<button className="signup-button" title="click me">Sign up</button>)
                    :
                    (<button disabled className="signingup-button flex items-center justify-center" title="click me">
                        <lord-icon
                            src="https://cdn.lordicon.com/nxooksci.json"
                            trigger="loop"
                            colors="primary:#0081a7"
                            state="loop"
                            className='w-[60px] h-[60px] m-0'>
                        </lord-icon>
                        <span className="ml-1">Signing up...</span>
                        
                    </button>)}
                    
                    <p className="text-[#0081a7] text-[14px] font-light text-center mt-3">Already have an account?&nbsp;
                    <Link href='/login'><span className="underline font-normal">Login here</span></Link> .</p>
                </form>
            </div>
        </div>
     );
}
 
export default Signup;
export {dataLoader,dataUploader};