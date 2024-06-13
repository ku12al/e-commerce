import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs"

import styles from "../../style/Style";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Iphne 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 999,
    },
    {
      name: "Iphne 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 1999,
    },
    {
      name: "Iphne 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 989,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[27%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} pl-2`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-3 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* cart single items */}
          <br/>
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle data={i} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
      <RxCross1 className="cursor-pointer w-full flex items-center"/>
        <img
          src="https://th.bing.com/th?id=OIP.tlTOYGsqFpTnUOAvMpYFOQHaJJ&w=224&h=277&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          alt=""
          className="w-[80px] h-[80px] ml-7"
        />

        <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#fb5151c0] font-Roboto">US${totalPrice}</h4>
        </div>

        <div>
            <BsCartPlus size={30} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
