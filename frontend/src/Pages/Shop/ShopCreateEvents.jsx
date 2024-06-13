import React from 'react'
import CreateEvent from "../../component/Shop/CreateEvent.jsx"
import DashboardHeader from '../../component/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'

const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex items-center justify-between w-full'>
            <div className='w-[330px'>
                  <DashboardSideBar active={6} />
            </div>
            <div className='w-full justify-center flex'>
                  <CreateEvent/>
            </div>
      </div>
    </div>
  )
}

export default ShopCreateEvents