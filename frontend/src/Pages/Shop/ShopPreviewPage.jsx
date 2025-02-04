import React from 'react'
import styles from '../../style/Style';
import ShopInfo from '../../component/Shop/ShopInfo';
import ShopProfileData from '../../component/Shop/ShopProfileData';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const ShopPreviewPage = () => {
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams(); // Get the shop ID from URL

  // Check if the logged-in seller is the owner of the shop
  const isOwner = seller?._id === id;
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
         <div className="w-full 800px:flex py-10 justify-between">
          <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
            <ShopInfo isOwner={isOwner} />
          </div>
          <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
            <ShopProfileData isOwner={isOwner} />
          </div>
         </div>
    </div>
  )
}

export default ShopPreviewPage