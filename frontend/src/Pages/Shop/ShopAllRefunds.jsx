import React from 'react'
import DashboardHeader from '../../component/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import AllRefundsOrders from '../../component/Shop/AllRefundsOrders.jsx'
const ShopAllRefunds = () => {
  return (
      <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={10} />
            </div>
            
            <div className='w-full justify-center flex'>
                  <AllRefundsOrders/>
            </div>
      </div>
    </div>
    
  )
}

export default ShopAllRefunds