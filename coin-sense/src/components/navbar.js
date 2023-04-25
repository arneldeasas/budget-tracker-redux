import Link from "next/link";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { dataLoader, dataUploader } from "@/pages/signup";
import { SetUserData } from "@/redux/global";


const Navbar = ({month}) => {
    const clone = require('rfdc')();
    const dispatch = useDispatch();
    const {user:UserData} = useSelector(state=>state.global)
    const [profileFirstName, setProfileFirstName] = useState('');
    const [profileLastName, setProfileLastName] = useState('');
    const [profileUsername, setProfileUsername] = useState('');
    const [profilePassword, setProfilePassword] = useState('');

    let namePattern = new RegExp(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/);
    let usernamePattern = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
    let passwordPattern = new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).{8,30}$/);

    const [fnFocus, setFnFocus] = useState('');
    const [isFnValid, setIsFnValid] = useState('');

    const [lnFocus, setLnFocus] = useState('');
    const [isLnValid, setIsLnValid] = useState('');

    const [usernameFocus, setUsernameFocus] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState('');

    const [passwordFocus, setPasswordFocus] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState('');

    const router = useRouter();
    const {monthInURL} = router.query
    const [openBackdrop,setOpenBackdrop]=useState(false);
    const [openAccPanel,setOpenAccPanel] = useState(false);

    const [openProfileEdit, setOpenProfileEdit] = useState(false);
    const [closedProfileEdit, setClosedProfileEdit] = useState(true);
    useEffect(()=>{
        
    },[UserData])
    
    const handleInputChange=(field, pattern, event)=>{
        
        switch(field){
            case 'firstname':
                
                if(!pattern.test(event.target.value)){
                    setIsFnValid(false);
                }else{
                    setIsFnValid(true);
                }
                break;
            case 'lastname':
                
                if(!pattern.test(event.target.value)){
                    setIsLnValid(false);
                }else{
                    setIsLnValid(true);
                }
                break;
            case 'username':
                
                if(!pattern.test(event.target.value)){
                    setIsUsernameValid(false);
                }else{
                    setIsUsernameValid(true);
                }
                break;
            case 'password':
                
                if(!pattern.test(event.target.value)){
                    setIsPasswordValid(false);
                }else{
                    setIsPasswordValid(true);
                }
                break;
            default:
                break;
        }

        
    }

    const handleClose=()=>{
        setOpenBackdrop(false);
        setOpenAccPanel(false);
    }   
    
    const editProfile = () =>{
        setProfileFirstName(UserData.firstname)
        setProfileLastName(UserData.lastname)
        setProfileUsername(UserData.username)
        setProfilePassword(UserData.password)
        setClosedProfileEdit(false);
        setOpenProfileEdit(true);
    }
    const handleCloseProfileEdit = () =>{
        setOpenProfileEdit(false);
    }

    const changeProfileFirstName = (event) =>{
        setProfileFirstName(event.target.value)
        console.log(profileFirstName)
    }
    const changeProfileLastName = (event) =>{
        setProfileLastName(event.target.value)
    }
    const changeProfileUsername = (event) =>{
        setProfileUsername(event.target.value)
    }
    const changeProfilePassword = (event) =>{
        setProfilePassword(event.target.value)
    }

    const confirmChange = (event) => {
        event.preventDefault();
        const tempUserData = clone(UserData);
        console.log(tempUserData);
        tempUserData.firstname = profileFirstName;
        tempUserData.lastname = profileLastName;
        tempUserData.username = profileUsername;
        tempUserData.password = profilePassword;
        
        dataUploader(`http://localhost:8000/users/${localStorage.getItem('id')}`,'PATCH',tempUserData)
        .then(()=>{
            dispatch(SetUserData(tempUserData))
            console.log(tempUserData)
            setOpenProfileEdit(false);

        });

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
                    <h2 onClick={editProfile} className="text-white my-4 text-base text-center font-light hover:cursor-pointer active:underline">
                        Edit Profile &nbsp;
                        <i className="fa-solid fa-pen"></i>
                        
                    </h2>
                </div>
                {!closedProfileEdit && (
                    <form onSubmit={confirmChange}>
                        <div className={`${openProfileEdit ? 'account-edit-container' : 'account-edit-container-reverse'} account-edit-animation grow p-5`}>
                                
                                <div className="input-container ">
                                    <label htmlFor="fname">First name</label>
                                    <div className="signup-input-container">
                                        <input 
                                            onChange={(event)=>{changeProfileFirstName(event);handleInputChange('firstname',namePattern,event)}}
                                            value={profileFirstName}
                                            onBlur={()=>setFnFocus(false)}
                                            onFocus={()=>{setFnFocus(true)}}
                                            maxLength='30' 
                                            required 
                                            pattern="^[a-zA-Z]+(?: [a-zA-Z]+)*$" 
                                            type="text" name="fname" id="fname" className="edit-input"
                                        />
                                        <div>
                                            <i className="text-gray-400 fa-solid fa-pen text-base"></i>
                                        </div>
                                    </div>
                                    
                                    <div className={`signup-tooltip-container ${fnFocus?'':'hide-tooltip'}`}>
                                        <div className={`signup-tooltip ${isFnValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                            <h2>must be all letters</h2>

                                            <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                        </div>
                                    
                                    </div>
                                </div>
                            
                                <div className="input-container ">
                                    <label htmlFor="lname">Last name</label>
                                    <div className="signup-input-container">
                                        <input 
                                            onChange={(event)=>{changeProfileLastName(event);handleInputChange('lastname',namePattern,event)}}
                                            onBlur={()=>setLnFocus(false)}
                                            onFocus={()=>{setLnFocus(true)}}
                                            value={profileLastName}
                                            maxLength='30' 
                                            required 
                                            pattern="^[a-zA-Z]+(?: [a-zA-Z]+)*$" 
                                            type="text" name="lname" id="lname" className="edit-input"
                                        />
                                        <div>
                                            <i className="text-gray-400 fa-solid fa-pen text-base"></i>
                                        </div>
                                    </div>
                                    
                                    <div className={`signup-tooltip-container ${lnFocus?'':'hide-tooltip'}`}>
                                        <div className={`signup-tooltip ${isLnValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                            <h2>must be all letters</h2>

                                            <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="input-container ">
                                    <label htmlFor="username">Username</label>
                                    <div className="signup-input-container">
                                        <input 
                                            onChange={(event)=>{changeProfileUsername(event);handleInputChange('username',usernamePattern,event)}}
                                            onBlur={()=>setUsernameFocus(false)}
                                            onFocus={()=>{setUsernameFocus(true)}}
                                            value={profileUsername}
                                            maxLength='30' 
                                            required 
                                            pattern="^[a-zA-Z0-9]{6,20}$"  
                                            type="text" name="username" id="username" className="edit-input"
                                        />
                                        <div>
                                            <i className="text-gray-400 fa-solid fa-pen text-base"></i>
                                        </div>
                                    </div>
                                    
                                    <div className={`signup-tooltip-container ${usernameFocus?'':'hide-tooltip'}`}>
                                        <div className={`signup-tooltip ${isUsernameValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                            <h2>must be atleast 6 characters long and 20 characters max</h2>
                                            <h2>must be in lowercase letters</h2>
                                            <h2>must not contain symbols</h2>

                                            <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="input-container ">
                                    <label htmlFor="fname">Password</label>
                                    <div className="signup-input-container">
                                        <input 
                                            onChange={(event)=>{changeProfilePassword(event);handleInputChange('password',passwordPattern,event)}}
                                            onBlur={()=>setPasswordFocus(false)}
                                            onFocus={()=>{setPasswordFocus(true)}}
                                            value={profilePassword}
                                            maxLength='30' 
                                            required 
                                            pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,30}$" 
                                            type="password" name="password" id="password" className="edit-input"
                                        />
                                        <div>
                                            <i className="text-gray-400 fa-solid fa-pen text-base"></i>
                                        </div>
                                    </div>
                                    
                                    <div className={`signup-tooltip-container ${passwordFocus?'':'hide-tooltip'}`}>
                                        <div className={`signup-tooltip ${isPasswordValid ? 'fade-out-animation':'fade-in-animation'} `}>
                                            <h2>must be atleast 8 characters long and 30 characters max</h2>
                                            <h2>must contain atleast 1 uppercase letter</h2>
                                            <h2>must contain atleast 1 number</h2>

                                            <div className="absolute bottom-[-5px] right-[10px] bg-[#3fd9d7] z-[0] h-[20px] w-[20px] rounded-sm rotate-45  "></div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="flex items-center justify-end">
                                    <div onClick={()=>{setOpenProfileEdit(false)}} className="white-button rounded-full text-base p-1 w-[80px] ml-2 text-center">Cancel</div> 
                                    <button className="solid-button rounded-full text-base p-1 w-[80px] ml-3">Save</button>
                                </div>
                        
                            
                        </div>
                    </form>
                    
                )}
                <button onClick={()=>{router.push('/login')}} className="text-white font-light bg-[#02bfc9] p-2 my-5 w-[80%] text-xl rounded-full block mx-auto">Logout</button>
            </div>
            <div className="flex justify-between px-3 w-full mx-[10%]">
                <Link href={'/dashboard/'+monthInURL}><i className="fa-solid fa-house"></i></Link>
                <Link href={`/dashboard/${monthInURL}/report`}><i className="fa-solid fa-chart-simple"></i></Link>
                <div onClick={()=>{setOpenBackdrop(true);setOpenAccPanel(true)}} ><i className="fa-solid fa-address-card"></i></div>
            </div>
            
        </div>
    );
}
 
export default Navbar;
