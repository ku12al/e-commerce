import React from "react";
import Footer from "../../component/Layout/Footer";
import ShopSettings from "../../component/Shop/ShopSettings.jsx";
import DashboardHeader from "../../component/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar.jsx";

const ShopSettingPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingPage;
