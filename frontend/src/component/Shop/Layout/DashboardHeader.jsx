import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server";

const DashboardHeader = () => {
  const { seller, isSeller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[70px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <div className="w-25 my-6 animate-bounce items-center">
            <h1 className="font-extrabold flex text-[#9cef4e] text-4xl">
              QuirkyCart
            </h1>
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to="/dashboard-events">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to="/dashboard-products">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to="/dashboard-orders">
            <FiPackage
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to="/dashboard-messages">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to="/dashboard-products">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          
          <Link to={`/shop/${seller._id}`}>
            <img src={`${backend_url}${seller.avatar}`} alt="" 
            className="w-[50px] h-[50px] rounded-full object-cover"/>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
