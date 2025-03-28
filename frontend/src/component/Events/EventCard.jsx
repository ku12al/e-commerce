import React from "react";
import CountDown from "./CountDown.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action/cart.js"; // Fixed function name
import { toast } from "react-toastify";
import styles from "../../style/Style.js";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    if (!data || !data._id) {
      toast.error("Invalid product data!");
      return;
    }

    const isItemExists = cart?.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      {/* Image Section */}
      <div className="w-[90%] lg:w-[50%] m-0.5">
        <img src={data?.images?.[0]?.url || "/default-image.jpg"} alt={data?.name || "Event"} />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>

        {/* Pricing */}
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice} ₹
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice} ₹
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out || 0} sold
          </span>
        </div>

        {/* Countdown Timer */}
        <CountDown data={data} />
        <br />

        {/* Buttons */}
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvents=true`}>
            <button className={`${styles.button} text-[#fff]`}>See Details</button>
          </Link>
          <button className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
