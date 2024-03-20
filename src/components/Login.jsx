import React, { useRef, useState } from 'react';
import Header from './Header';
import { validateEmail , validateName, validatePassword } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { USER_LOGO } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import lang from "../utils/language.js"
import { addUser } from '../utils/redux/slices/userSlice.js';
const Login = () => {
    const dispatch = useDispatch();
    const { language } = useSelector(store => store.appConfig)
    const [ formType , setFormType ] = useState("signin");
    const [ validInputs , setValidInputs ] = useState(0);

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleFormChange = () => {
        email.current.value = "" ;
        password.current.value = "" ;
        if(formType === "signup")document.getElementById("nameError").innerText="";
        document.getElementById("emailError").innerText="";
        document.getElementById("passwordError").innerText="";
        document.getElementById("submitError").innerText="";
        setValidInputs(0);
        setFormType( formType === "signin" ? "signup" : "signin" )
    }

    const handleSubmit = async () => {
        if( formType === "signup" && validInputs === 3 ){
            try{
                await createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                try{
                    await updateProfile( auth.currentUser , {
                        displayName : name.current.value ,
                        photoURL : `${USER_LOGO + name.current.value}`
                    } )
                    const { uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch( addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }) );
                }catch(error){
                    console.log(error);
                }
            }catch(error){
                console.log(error);
                document.getElementById("submitError").innerText=error;
            }
            return;
        }
        else if( formType === "signin" && validInputs === 2 ){
            try{
                await signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                document.getElementById("submitError").innerText = "";
            }catch(error){
                console.log(error);
                document.getElementById("submitError").innerText = error
            }
            return;
        }
    }
    return (
        <div className='bg-hero bg-cover  max-w-screen min-h-screen overflow-x-hidden'>
            <div className='bg-gradient-to-b from-[rgba(0,0,0,0.7)]  w-screen min-h-screen'>
                <Header/>
                <div className='flex items-center justify-center'>
                    <form onSubmit={(e) => e.preventDefault()}
                    className=' bg-black py-8 px-8 flex flex-col gap-10 bg-opacity-80 rounded-md w-[90%] sm:w-[30%] mt-10 sm:mt-4'>
                        <label className='text-3xl font-semibold text-white'>
                            {
                                formType === "signin" ? lang[language].signIn : lang[language].signUp
                            }
                        </label>
                        <div className='flex flex-col gap-4 '>
                            {
                                formType === "signup" && 
                                <div>
                                    <input 
                                        type='text' 
                                        placeholder={ lang[language].namePlaceholder }
                                        ref={name}
                                        onBlur={ () => {
                                            const error = validateName(name.current.value);
                                            document.getElementById("nameError").innerText = error === null ? "" : error; 
                                            if(error === null)setValidInputs(validInputs+1);
                                        } }
                                        className='w-full bg-[#333333] text-white rounded-md px-5 py-3 placeholder-[#656565] focus:outline-none'
                                    />
                                    <div id="nameError" className='text-red-600 italic text-sm'></div>
                                </div>
                            }
                            <div>
                                <input 
                                    type='text' 
                                    placeholder={ lang[language].emailPlaceholder }
                                    ref={email}
                                    onBlur={ () => {
                                        const error = validateEmail(email.current.value);
                                        document.getElementById("emailError").innerText = error === null ? "" : error; 
                                        if(error === null)setValidInputs(validInputs+1);
                                    } }
                                    className='w-full bg-[#333333] text-white rounded-md px-5 py-3 placeholder-[#656565] focus:outline-none'
                                />
                                <div id="emailError" className='text-red-600 italic text-sm'></div>
                            </div>
                            <div>
                                <input 
                                    type='password' 
                                    placeholder={ lang[language].passwordPlaceholder }
                                    ref={password}
                                    onBlur={ () => {
                                        const error = validatePassword(password.current.value);
                                        document.getElementById("passwordError").innerText = error === null ? "" : error; 
                                        if(error === null)setValidInputs(validInputs+1);
                                    } }
                                    className='w-full bg-[#333333] text-white rounded-md px-5 py-3 placeholder-[#656565] focus:outline-none'
                                />
                                <div id="passwordError" className='text-red-600 italic text-sm'></div>
                            </div>
                        </div>
                        <div>
                            <div id='submitError' className='text-red-600 italic text-sm'></div>
                            <button type='submit' onClick={handleSubmit}
                            className='bg-[#e50914] rounded-md px-12 py-3 text-white font-semibold w-full'>
                                { formType === "signin" ? lang[language].signIn : lang[language].signUp }
                            </button>
                            <div className='flex justify-between items-center text-sm mt-2'>
                                <div className='text-[#a0a0a0] flex items-center gap-1'>
                                    <input id="remember" type='checkbox' className='accent-[#737373]'/>
                                    <label htmlFor='remember'>{ lang[language].rememberMe }</label>
                                </div>
                                <div className='text-[#b3b3b3]'>{ lang[language].needHelp }</div>
                            </div>
                        </div>
                        <div className='flex gap-1'>
                        <p className='text-[#595859]'>
                            {
                                formType === "signin" ? lang[language].alreadyRegistered  : lang[language].newToNetflix
                            }
                        </p>
                            <p onClick={ () => handleFormChange() }
                            className='text-white font-semibold cursor-pointer'>
                                {
                                    formType === "signin" ? lang[language].signUpNow  : lang[language].signInNow
                                }
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login