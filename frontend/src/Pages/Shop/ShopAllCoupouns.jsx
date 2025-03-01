import React from 'react'
import DashboardHeader from '../../component/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import AllCoupouns from '../../component/Shop/AllCoupouns.jsx'

const ShopAllCoupouns = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex items-center justify-between w-full'>
            <div className='w-[330px]'>
                  <DashboardSideBar active={9} />
            </div>
            <div className='w-full justify-center flex'>
                  <AllCoupouns/>
            </div>
      </div>
    </div>
  )
}

export default ShopAllCoupouns