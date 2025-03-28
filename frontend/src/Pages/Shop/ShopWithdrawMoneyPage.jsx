import React from 'react'
import DashboardHeader from '../../component/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import WithdrawMoney from "../../component/Shop/WithdrawMoney.jsx"
const ShopWithdrawMoneyPage = () => {
  return (
      <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  )
}

export default ShopWithdrawMoneyPage