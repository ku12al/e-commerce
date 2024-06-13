import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../style/Style";

const Cart = ({ setOpenCart }) => {
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
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} pl-2`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-3 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* cart single items */}
          <br/>
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle data={i} key={index} />)}
          </div>
        </div>

        <div>
            {/* checkout buttons */}
            <Link to="/checkout">
            <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                  <h1 className="text-[#fff] text-[18px] font-[600]">Checout Now (USD$1080)</h1>
            </div>
            </Link>
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
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>

          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://th.bing.com/th?id=OIP.tlTOYGsqFpTnUOAvMpYFOQHaJJ&w=224&h=277&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          alt=""
          className="w-[80px] h-[80px] ml-7"
        />

        <div className="pl-[10px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] text-[15px] text-[#000000c0] ">${data.price} * {value}</h4>
            <h4 className="font-[600] text-[15px] text-[#fb5151c0] ">US${totalPrice}</h4>
        </div>
      </div>
    </div>
  );
};

export default Cart;
