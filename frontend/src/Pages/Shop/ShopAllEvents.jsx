import React, { useState } from 'react'
import DashboardHeader from '../../component/Shop/Layout/DashboardHeader'
import AllEvents from '../../component/Shop/AllEvents.jsx'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={5} />
            </div>
            
            <div className='w-full justify-center flex'>
                  <AllEvents/>
            </div>
      </div>
    </div>
  )
}

export default ShopAllProducts