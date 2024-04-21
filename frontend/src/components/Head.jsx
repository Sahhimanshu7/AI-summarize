import React from 'react'
import logo from "../../public/images/logo.png"
import CallMadeIcon from '@mui/icons-material/CallMade';

const Head = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full p-8'>
        <img src={logo} alt='logo' className='w-28 object-contain rounded-3xl' />
        <a href='https://www.sahhimanshu7.com' target='__blank'>
          <button className='rounded-3xl bg-slate-900 text-white p-2 text-[12px] border-none outline-none flex justify-center'>
            My Profile <CallMadeIcon sx={{ fontSize: 12 }}/>
          </button>
        </a> 
      </nav>
      <h1 className=''>
        Summarize articles from link or pdf
      </h1>
    </header>
  )
}

export default Head