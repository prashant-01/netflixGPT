import React, { useEffect, useState } from 'react'
import netflix_logo from '../assets/Netflix_Logo_PMS.png';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser , removeUser } from '../utils/redux/slices/userSlice';
import { FaSearch } from "react-icons/fa";
import { setGptSuggestions, setShowGPT } from '../utils/redux/slices/gptSlice';
import { SUPPORTED_LANGUAGE } from '../utils/constants';
import { setLanguage } from '../utils/redux/slices/appConfigSlice';
import { GiHamburgerMenu } from "react-icons/gi";
import lang from '../utils/language';
const Header = () => {
  const { language } = useSelector(store => store.appConfig)
  const { user } = useSelector( store => store.user );
  const { showGPT } = useSelector( store => store.gpt );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ showDropDown , setShowDropDown ] = useState(false);
  const handleGPT = () => {
    showGPT ? dispatch( setShowGPT(false) ) : dispatch( setShowGPT(true) )
  }

  const handleLanguage = (e) => {
    dispatch(setLanguage(e.target.value));
  }
  const handleSignOut = async () => {
    try{
      await signOut(auth)
      dispatch( removeUser() );
      navigate('/');
    }catch(error){
      console.log(error);
      navigate('/error-page');
    }
  }

  useEffect( () => {
    const unsubscribe = onAuthStateChanged( auth , (user) => {
      if(user){
        const { uid , email , displayName , photoURL } = user;
        dispatch(addUser( { uid : uid , email : email , displayName : displayName , photoURL : photoURL } ));
        navigate('/browse');
      }
      else{
        dispatch( removeUser() );
        navigate('/');
      }
    })
    return () => unsubscribe();
  } , []);
  return (
    <div className='flex flex-col sm:flex-row sm:items-center items-start justify-start sm:justify-between'>
        <div className='mx-4 sm:mx-0 flex items-center'>
          <div onClick={ () => setShowDropDown(!showDropDown) }
          className='sm:invisible cursor-pointer'><GiHamburgerMenu color='white' size={`2rem`}/></div>
          <img src={ netflix_logo } alt='Website Logo' className='w-32 sm:w-64 object-cover'/>
        </div>
        <div className={ `${showDropDown ? 'block' : 'hidden sm:block'} w-full px-5 sm:px-2
        bg-black bg-opacity-50 sm:bg-transparent sm:bg-opacity-100 ` }>
          <select onChange={ handleLanguage }
          className='text-white sm:px-6 px-0 py-2 focus:outline-none bg-transparent sm:text-xl cursor-pointer border rounded-md'>
            {
              SUPPORTED_LANGUAGE.map(lang => (
                <option key={ lang.identifier } 
                value={ lang.identifier }
                className='bg-transparent text-black'>{ lang.name }</option>
              ))
            }
          </select>
        </div>
        <div className={`${ showDropDown ? 'block' : 'hidden sm:block' } bg-black bg-opacity-50 sm:bg-transparent sm:bg-opacity-100 
          w-full sm:max-w-max px-5 sm:px-2 py-4
          flex flex-col sm:flex-row sm:items-center items-start justify-start sm:justify-center gap-3 sm:gap-6 `}>
            <div>
            {
              user && 
              <div className='flex flex-col sm:flex-row sm:items-center items-start justify-start sm:justify-center gap-3 sm:gap-6'>
                <button onClick={ () => {
                  dispatch(setGptSuggestions(null));
                  handleGPT()
                } }
                className='bg-[#e50914] rounded-md text-white font-semibold px-4 py-2 flex items-center gap-1'>
                  <p>
                    { 
                      showGPT ? 
                      `${ lang[language].home }` 
                      : `${ lang[language].gptSearch }` 
                    }
                  </p>
                  { !showGPT && <FaSearch size={`1rem`}/> }
                </button>
                <img src={ user?.photoURL } alt='userIcon' className='object-cover size-[40px] rounded-sm'/>
                <button onClick={handleSignOut}
                className='bg-[#e50914] rounded-md text-white font-semibold px-4 py-2'>
                  { lang[language].signOut }
                </button>
              </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Header