import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../style/Style";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromwishlist } from "../../../redux/action/wishlist";
import { addTocart } from "../../../redux/action/cart";
import { toast } from "react-toastify";

const ProductCart = ({ data }) => {
  const {wishlist} = useSelector((state) => state.wishlist);
  const {cart} = useSelector((state) => state.cart)
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(wishlist && wishlist.find((i) => i._id === data._id)){
      setClick(true);
    }
    else{
      setClick(false);
    }
  },[wishlist])

  const removeFromWishlistHandler = (data) =>{
    setClick(!click);
    dispatch(removeFromwishlist(data));
  }

  const addToWishlistHandler = (data) =>{
    setClick(!click);
    dispatch(addToWishlist(data));
  }

  const addToCartHandler = (id) =>{
    const isItemExits = cart && cart.find((i) => i._id === id);
    if(isItemExits){
      toast.error("Item already in cart")
    }else{
      if(data.stock < 1){
        toast.success("Product stock limited")
      }else{
        const cartData = {...data, qty: 1}
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully")
      }
    }
  }

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-md p-3 relative cursor-pointer">
        <div></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>

        {/* <Link to={`/shop/preview/${data.seller._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link> */}

        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <AiFillStar className="mr-2 cursor-pointer" color="yellow" />
            <AiFillStar className="mr-2 cursor-pointer" color="yellow" />
            <AiFillStar className="mr-2 cursor-pointer" color="yellow" />
            <AiFillStar className="mr-2 cursor-pointer" color="yellow" />
            <AiFillStar className="mr-2 cursor-pointer" color="yellow" />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.price ? data.price + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.total_sell} sold
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCart;
