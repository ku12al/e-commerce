import React from 'react'
import DashboardHeader from '../../component/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import DashboardMessages from '../../component/Shop/DashboardMessages.jsx'

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex items-start justify-between w-full'>
            <div className='w-[80px] 800px:w-[330px]'>
                  <DashboardSideBar active={8}/>
            </div>
            <DashboardMessages />
      </div>
      
    </div>
  )
}

export default ShopInboxPage