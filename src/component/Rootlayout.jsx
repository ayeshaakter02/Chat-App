import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

const Rootlayout = () => {
  return (
    <main className='flex '>
    <Sidebar/>
    <Outlet/>
    </main>
  )
}

export default Rootlayout