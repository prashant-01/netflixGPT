import React from 'react'
import { GoInfo } from "react-icons/go";
import { IoPlaySharp } from "react-icons/io5";
import Header from '../Header';
import { useSelector } from 'react-redux';
import lang from '../../utils/language';
const VideoTitle = ({ title , overview }) => {
    const { language } = useSelector( store => store.appConfig );
    return (
        <div className='text-white absolute w-full aspect-video bg-[rgba(0,0,0,.7)]'>
            <Header/>
            <div className='sm:pt-28 sm:pl-12 pl-6'>
                <p className='sm:text-6xl text-xl font-semibold '>{ title }</p>
                <p className='sm:w-[550px] w-[350px] text-wrap sm:mt-6 text-gray-700 sm:text-white'>{ overview }</p>
                <div className='flex gap-4 items-center mt-4'>
                    <button className='flex gap-2 items-center border rounded-md px-4 py-2'>
                        <IoPlaySharp size={`1.75rem`} />
                        <p className='text-lg'>{ lang[language].play }</p>
                    </button>
                    <button className='flex gap-2 items-center border rounded-md px-4 py-2'>
                        <GoInfo size={`1.75rem`}/>
                        <p className='text-lg'>{ lang[language].moreInfo }</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoTitle